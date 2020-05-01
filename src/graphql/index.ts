import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import 'graphql-import-node'
import rootSchema from './schemas/schema.graphql'

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    rootSchema
  ]
})