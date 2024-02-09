import { queryDB } from '../../pg/db'
// const pg = require('../../pg/db');
import { MigrationFunction } from '../run-migrations'
// const { type MigrationFunction } = require('../run-migrations')

const migration: MigrationFunction = async () => {
    await queryDB(`
        CREATE TABLE IF NOT EXISTS users (
            id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(),

            /* external_id is the unique id to identify the user to
               the external authentication server. */
            external_id text UNIQUE,
            
            email text NOT NULL UNIQUE,
            phone_number text DEFAULT NULL,

            firstname text NOT NULL,
            lastname text NOT NULL,
            
            registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            last_login TIMESTAMPTZ DEFAULT null,
    
            CONSTRAINT userid_pk PRIMARY KEY (id)
        );
    `);

    // await queryDB(`
    //     CREATE TABLE IF NOT EXISTS roles (
    //         id 
    //         security_level: bigint NOT NULL
    //     );
    // `);
}

export default migration;
// export async function: MigrationFunction = () => Promise<void> {
// }