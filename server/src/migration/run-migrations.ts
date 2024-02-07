import * as pg from '../pg/db';
import fs from 'fs';
import * as path from 'path';

const MIGRATION_TABLE_NAME = "__migrations";
const MIGRATION_FILES_PATH = "src/migration/migration-files";

export async function runMigrations(): Promise<void> {
    console.log("\nRunning migrations...\n");
    
    try {
        // Create the uuid-ossp extension if not exists
        await pg.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        // Check if the migration table exists
        const migrationTableExists = await doesMigrationTableExist();
        
        if (!migrationTableExists) {
            // If migration table does not exist, create it
            console.log("\u001b[1;33mMigrations table does not exist in DB. Creating it now...");
            console.log("\u001b[0m");

            await pg.query(`
                CREATE TABLE IF NOT EXISTS ${MIGRATION_TABLE_NAME} (
                    id bigint NOT NULL UNIQUE,
                    name text NOT NULL,
                    executed_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    CONSTRAINT pgmigrations_pk PRIMARY KEY (id)
                );
            `);

            console.log("\u001b[1;32mCreated migrations table.");
            console.log("\u001b[0m");
        } else {
            console.log("\u001b[1;32mMigration table already exists.");
            console.log("\u001b[0m");
        }

        // Find the latest (highest) migration that took place
        await pg.query(`SELECT MAX(id) FROM ${MIGRATION_TABLE_NAME}`).then(async (res) => {
            // Run actual migrations
            await runAllMigrationFiles(res.rows[0].max).then()
        })
    } catch (error) {
        console.error("\u001b[1;31mAn error occurred during migrations:", error);
        console.log("\u001b[0m");
        throw error; // Re-throw the error to handle it outside
    }
    
    console.log("\u001b[1;32mMigrations completed successfully.");
    console.log("\u001b[0m");
}

async function doesMigrationTableExist(): Promise<boolean> {
    try {
        // Check if the migration table exists
        const result = await pg.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables 
                WHERE table_name = '${MIGRATION_TABLE_NAME}'
            );
        `);
        
        return result.rows[0].exists;
    } catch (error) {
        console.error("Error checking if migration table exists:", error);
        throw error; // Re-throw the error to handle it outside
    }
}

async function runAllMigrationFiles(maxMigrationResult: number): Promise<void> {
    const migrationFiles: MigrationFile[] = [];
    
    try {
        // Finds all the files in the given directory
        fs.readdirSync(MIGRATION_FILES_PATH).forEach((file) => {
            const regex = /^(\d+)-(.+)\.ts$/; // Regular expression to match the pattern
            const match = file.match(regex); // Match the file name against the regular expression
            
            if (match) {
                const filePath = path.resolve(MIGRATION_FILES_PATH, file)
                const migration = require(filePath).default as MigrationFunction;
                migrationFiles.push({ id: parseInt(match[1]), name: match[2], fileName: file, migration })
            } else {
                console.error("\u001b[1;31mMigration file name doesn't match the format \"DDD-some-name.ts\"");
                console.log("\u001b[0m");

                // Clear files so we dont make accidental migrations
                for (let i = 0; i < migrationFiles.length; i++) {
                    migrationFiles.pop();
                }

                return
            }
        })

        const latestMigrationFile = migrationFiles.reduce((prev, curr) => (prev.id > curr.id) ? prev : curr).id
        
        if (maxMigrationResult?.toString().length > 0 && maxMigrationResult >= latestMigrationFile) {
            console.log("\u001b[1;32mNothing to migrate.");
            console.log("\u001b[0m");
        } else {
            await performMigrations(migrationFiles.filter((file: MigrationFile) => file.id > maxMigrationResult))
        }
        
    } catch (error) {
        console.error("\u001b[1;31mAn error has occured during migration.");
        console.log("\u001b[0m");
        throw error; // Re-throw the error to handle it outside
    }
}

async function performMigrations(migrationFiles: MigrationFile[]) : Promise<void> {
    migrationFiles.sort((a: MigrationFile, b: MigrationFile) => a.id > b.id ? 1 : -1)
    
    await pg.query("BEGIN TRANSACTION;");

    try {

        for (const file of migrationFiles) {
            console.log(`\u001b[1;32mMigrating file with ID ${file.id}`);
            console.log("\u001b[0m");
            if (file.migration) {
                try {
                    await file.migration()
                    await pg.query(`INSERT INTO ${MIGRATION_TABLE_NAME} (id, name) VALUES ($1, $2) `, [file.id, file.name])
                } catch (err) {
                    throw err
                }
            } else {
                throw new Error(`Migration file ${file.fileName} is not formatted correctly!`)
            }
        }

        await pg.query("COMMIT TRANSACTION;");
    } catch (err) {
        console.error("\u001b[1;31mAn error has occured during migration. Rolling back transactions...");
        console.log("\u001b[0m");
        await pg.query("ROLLBACK TRANSACTION;");
        throw err;
    }

}

type MigrationFile = {
    id: number;
    name: string;
    fileName: string;
    migration?: () => Promise<void>;
}

export type MigrationFunction = () => Promise<void>;