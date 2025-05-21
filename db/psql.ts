import { Pool } from 'pg'

const ENV = process.env.NODE_ENV || 'development';

import { config as dotenvConfig } from 'dotenv'

dotenvConfig({path: `${__dirname}/../.env.${ENV}`})


const db = new Pool();

module.exports = db;


