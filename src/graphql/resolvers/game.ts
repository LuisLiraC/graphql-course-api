import { IResolvers } from 'graphql-tools'

export const game: IResolvers = {
  Query: {
    gameHello() {
      return "game works"
    },
  }
}