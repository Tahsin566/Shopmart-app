import mongoose from 'mongoose'
import dotenv from 'dotenv'
import pkg from 'pg'

const {Pool} = pkg

dotenv.config()

export const connect = await mongoose.connect(process.env.MONGO_URL)

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
export const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});
