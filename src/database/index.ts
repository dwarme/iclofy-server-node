import { Pool } from 'pg'
import dotenvConfig from '../utils/dotenv-config-util';
import { exit } from 'process';

dotenvConfig()

let pool: Pool;
try {
    pool = new Pool({
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT as unknown as number
    });

} catch (err) {
    console.log(err)
    exit(0)
}

export default pool;
