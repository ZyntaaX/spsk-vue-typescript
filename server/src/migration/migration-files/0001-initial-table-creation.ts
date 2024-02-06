import * as pg from '../../pg/db'
import { MigrationFunction } from '../run-migrations'

const migration: MigrationFunction = async () => {
    await pg.query(`
        CREATE TABLE IF NOT EXISTS users (
            id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
            email text NOT NULL UNIQUE,
    
            
            registered_at timestamp NOT NULL DEFAULT NOW(),
    
            CONSTRAINT userid_pk PRIMARY KEY (id)
        );
    `);
}

export default migration;
// export async function: MigrationFunction = () => Promise<void> {
// }