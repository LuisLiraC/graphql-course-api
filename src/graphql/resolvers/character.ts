import { IResolvers } from 'graphql-tools'
import data from '../../data/data.json'
import { Db, ObjectID } from 'mongodb'
import { CHARACTERS_COLLECTION, GAMES_COLLECTION } from '../../mongo/collections'

export const characterResolver: IResolvers = {
  Query: {
    async getCharacters(root: void, args: void, context: Db) {
      try {
        return await context.collection(CHARACTERS_COLLECTION)
          .find()
          .toArray()
      } catch (error) {
        console.log(error)
      }
    },
    async getCharacter(root: void, args: any, context: Db) {
      try {
        const found = await context.collection(CHARACTERS_COLLECTION)
          .findOne({ _id: new ObjectID(args._id) }) 

        return found
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    async createCharacter(root: void, args: any, context: Db) {
      try {
        await context.collection(CHARACTERS_COLLECTION)
          .insertOne(args.character)
        return 'Character added successfully'
      } catch (error) {
        console.log(error)
      }
    },
    async editCharacter(root: void, args: any, context: Db) {
      try {
        const exists = await context.collection(CHARACTERS_COLLECTION)
          .findOne({ _id: new ObjectID(args._id) })

        if (exists) {
          await context.collection(CHARACTERS_COLLECTION)
            .updateOne(
              { _id: new ObjectID(args._id) },
              { $set: args.character }
            )

          return 'Character updated'
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  Character: {
    async games(parent: any, args: void, context: Db) {
      const gameList = parent.games.map(async (gameId: string) => 
        await context.collection(GAMES_COLLECTION)
          .findOne({ _id: new ObjectID(gameId) })
      )

      return gameList
    }
  }
}