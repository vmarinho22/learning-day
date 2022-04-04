import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        mail: String!
        permission: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        users: [User]!
    }
`;