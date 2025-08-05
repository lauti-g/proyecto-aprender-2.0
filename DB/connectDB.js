import mysql from 'mysql2/promise'
import 'dotenv/config' 


export const pool = new mysql.createPool({
        user: process.env.DB_user,
        host: process.env.DB_host,
        database: process.env.DB_database,
        password: process.env.DB_password,
    })
