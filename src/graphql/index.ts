import { GraphQLSchema } from 'graphql'
import { mergeSchemas } from 'graphql-tools'
import 'graphql-import-node'
import character from './schemas/character.graphql'
import game from './schemas/game.graphql'
import developer from './schemas/developer.graphql'
import { characterResolver } from './resolvers/character'
import { gameResolver } from './resolvers/game'
import { developerResolver } from './resolvers/developer'


export const schema: GraphQLSchema = mergeSchemas({
  schemas: [
    character,
    game,
    developer
  ],
  resolvers: [
    characterResolver,
    gameResolver,
    developerResolver
  ]
})