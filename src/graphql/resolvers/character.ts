import { IResolvers } from 'graphql-tools'
import data from '../../data/data.json'

export const characterResolver: IResolvers = {
  Query: {
    getCharacters() {
      return data.characters
    },
    getCharacter(root: void, args: any) {
      const [found] = data.characters.filter(ch => ch._id === args._id)
      return found
    }
  },
  Mutation: {
    createCharacter(root: void, args: any) {
      args.character._id = `${data.characters.length + 1}`
      data.characters.push(args.character)
      return 'Character added successfully'
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