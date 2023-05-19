import { ApolloServer, gql } from 'apollo-server';

// Define your GraphQL schema
const mocks = {
  Date: () => "1/02/2025"
}

const typeDefs = gql`

scalar Date

"""
Object that describes the characteristics of a book
"""
type BookDay {
  "Book id unique identifier"
  id: ID!
  date: Date!,
  books: [Books]
}

enum Books {
  PHYSICAL
  EBOOK
}

type Query {
  totalDays: Int!
  alldays: [BookDay]!
}

input AddBookInput {
  date: Date
  books: [Books]
}

type RemoveBookPayload {
  day: BookDay
  removed: Boolean
  totalBefore: Int
  totalAfter: Int
}


type Mutation {
  addBook(input: AddBookInput): BookDay!
  removeBook(id: ID!): BookDay!
}

type Subscription {
  newBook: BookDay
}
`;


// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, mocks });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
