import GMR from 'graphql-merge-resolvers'
import { IResolvers } from 'graphql-tools'
import { character } from './character'
import { game } from './game'

const resolvers: any = GMR.merge([
  character,
  game
])


export default resolvers