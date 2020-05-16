import { IResolvers } from 'graphql-tools'
import data from '../../data/data.json'
import { Db } from 'mongodb'

export const characterResolver: IResolvers = {
  Query: {
    async getCharacters(root: void, args: void, context: Db) {
      try {
        return await context.collection('characters').find().toArray()
      } catch (error) {
        console.log(error)
      }
    },
    getCharacter(root: void, args: any) {
      const [found] = data.characters.filter(ch => ch._id === args._id)
      return found
    }
  },
  Mutation: {
    async createCharacter(root: void, args: any, context: Db) {
      try {
        await context.collection('characters').insertOne(args.character)
        return 'Character added successfully'
      } catch (error) {
        console.log(error)
      }
    }
  },
  Character: {
    games(parent: any) {
      const gameList: Array<any> = []
      parent.games.map((gameId: string) => 
        gameList.push(...data.games.filter(game => game._id === gameId))
      )

      return gameList
    }
  }
}