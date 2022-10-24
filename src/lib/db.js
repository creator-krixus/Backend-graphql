'use strict'
const { MongoClient } = require('mongodb')
const { BD_USER, BD_PASSWD, BD_HOST, BD_NAME } = process.env

const mongoUrl = `mongodb+srv://${BD_USER}:${BD_PASSWD}@${BD_HOST}/${BD_NAME}`
let connection
async function connectDB (){
    if(connection) return connection

    let client
    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        })
        connection = client.db(BD_NAME)
    } catch (error) {
       console.error('could not connect to db', mongoUrl, error)
       process.exit(1) 
    }
    return connection
}

module.exports = connectDB