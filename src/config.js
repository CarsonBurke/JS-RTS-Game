require('dotenv').config()
let { Pool, Client } = require('pg')

let tables = [{
    name: 'users',
    content: 'user_id SERIAL, username VARCHAR (50), email VARCHAR (50) UNIQUE, hash VARCHAR',
}]

let pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: 'postgres',
    password: process.env.PASSWORD,
    port: process.env.PORT
})

deleteDb().then(() => {

    createDbAndTables()
})

function deleteDb() {
    return new Promise((resolve, reject) => {
        pool.query('DROP DATABASE IF EXISTS ' + process.env.DATABASE, (err, res) => {
            if (err) {

                reject(err)
            } else {

                resolve('deleted db ' + process.env.DATABASE);
            }
        })
    })
}

function createDbAndTables() {
    pool.query('CREATE DATABASE ' + process.env.DATABASE, (err, res) => {

        console.log('created db ' + process.env.DATABASE)

        let client = new Client({
            user: process.env.USER,
            host: process.env.HOST,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            port: process.env.PORT
        })

        client.connect()

        for (let i = 0; i < tables.length; i++) {

            let table = tables[i]

            client.query(
                'CREATE TABLE ' + table.name + '(' + table.content + ')',
                (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('created table ' + table.name);
                    }
                    if (i == tables.length) {
                        client.end()
                    }
                }
            )
        }
        pool.end()
    })
}