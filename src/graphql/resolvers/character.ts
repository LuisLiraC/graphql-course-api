import { IResolvers } from 'graphql-tools'
import { Db, ObjectID } from 'mongodb'
import { CHARACTERS_COLLECTION, GAMES_COLLECTION } from '../../mongo/collections'
import { ICharacter } from '../../interfaces/ICharacter'

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
        const regexp = new RegExp(args.character.name, 'i')
        const exists = await context.collection(CHARACTERS_COLLECTION)
          .findOne({ name: regexp })
        
        if (exists) {
          throw new Error('Character already exists')
        }

        await context.collection(CHARACTERS_COLLECTION)
          .insertOne(args.character)
        return 'Character added successfully'
      } catch (error) {
        console.log(error)
        return error.message
      }
    },
    async editCharacter(root: void, { _id, character}: { _id: string, character: ICharacter}, context: Db) {
      try {
        const exists = await context.collection(CHARACTERS_COLLECTION)
          .findOne({ _id: new ObjectID(_id) })

        if (exists) {
          await context.collection(CHARACTERS_COLLECTION)
            .updateOne(
              { _id: new ObjectID(_id) },
              { $set: character }
            )

          return 'Character updated'
        }

        throw new Error('Character does not exists')
      } catch (error) {
        console.log(error)
        return error.message
      }
    }
  },
  Character: {
    async games(parent: ICharacter, args: void, context: Db) {
      const gameList = parent.games.map(async (gameId) => 
        await context.collection(GAMES_COLLECTION)
          .findOne({ _id: new ObjectID(gameId) })
      )

      return gameList
    }
  }
}