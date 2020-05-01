import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import 'graphql-import-node'
import rootSchema from './schemas/schema.graphql'
import resolvers from './resolvers/resolversMap'

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    rootSchema
  ],
  resolvers
})