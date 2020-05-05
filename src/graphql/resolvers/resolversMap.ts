import { IResolvers } from 'graphql-tools'

const resolvers: IResolvers = {
  Query: {
    hello() {
      return "world"
    },
    getCharacters() {
      return [
        {
          id: 1,
          name: 'Link',
          race: 'HYLIAN'
        },
        {
          id: 2,
          name: 'Zelda',
          race: 'HYLIAN'
        }
      ]
    }
  }
}

export default resolvers