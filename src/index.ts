import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './graphql'
import depthLimit from 'graphql-depth-limit'
import MongoLib from './mongo'
import config from './config'

const app = express()
app.use(cors())

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: async () => new MongoLib().connect(),
  validationRules: [
    depthLimit(10)
  ]
})

server.applyMiddleware({ app })

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}/graphql`)
})