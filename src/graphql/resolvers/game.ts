import { IResolvers } from 'graphql-tools'

export const gameResolver: IResolvers = {
  Query: {
    gameHello() {
      return "game works"
    },
  }
}