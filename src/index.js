'use strict'
require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
//Se usa para unir las rutas
const {readFileSync} = require('fs')
const { join } = require('path')

const resolvers = require('./querys/resolvers')

const app = express()
const port = process.env.PORT || 3000

//Esquemas de consulta
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use('/api/v1', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/api/v1`)
})
