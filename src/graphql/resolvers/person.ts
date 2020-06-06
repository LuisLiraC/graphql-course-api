import { IResolvers } from 'graphql-tools'
import data from '../../data/data.json'

export const personResolver: IResolvers = {
  Query: {
    getPerson(__: void, args: any) {
      const [found] = data.people.filter(p => p.id === args.id)
      return found
    }
  },
  Person: {
    __resolveType(obj: any) {
      return obj.age ? 'Male' : 'Female'
    }
  }
}