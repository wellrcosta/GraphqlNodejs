import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from 'node:crypto'

/**
 * Under fetching
 * Endpoint retorna dados de menos.
 * 
 * Over fetching
 * Endpoint que retorna dados demais.
 */

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
  
`

interface User {
  id: string
  name: string
}

const users: User[] = []


const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => users
    },
    Mutation: {
      createUser: (_, args) => {
        const user: User = {
          id: randomUUID(),
          name: args.name
        }
        users.push(user)
        return user
      }
    }
  }
})

server.listen().then(({url}) => {
  console.log(`HTTP server running on ${url}`)
})