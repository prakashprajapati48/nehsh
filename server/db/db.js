import 'dotenv/config'
import pg from "pg";
// import mysql2 from 'mysql2'

// export const connection = mysql2.createConnection({
//     host: process.env.dbhost,
//     user: process.env.dbuser,
//     password: "",
//     database: process.env.database
// })

const { Pool } = pg;
export const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // required on Railway
});

if (connection) {
    // console.log(`db host: ${process.env.dbhost}`)
    // console.log(`db user: ${process.env.dbuser}`)
    console.log("Database successfully connected!")
}