import { GraphQLSchema } from 'graphql'
import { mergeSchemas } from 'graphql-tools'
import 'graphql-import-node'
import character from './schemas/character.graphql'
import game from './schemas/game.graphql'
import resolvers from './resolvers'

export const schema: GraphQLSchema = mergeSchemas({
  schemas: [
    character,
    game
  ],
  resolvers
})