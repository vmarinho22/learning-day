import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        mail: String!
        permission: Int!
        blocked: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    input createUserInput {
        name: String!
        mail: String!
        password: String!
        permission: Int!
    }

    input updateUserInput {
        name: String
        mail: String
        password: String
        permission: Int
    }

    type Trainings {
        id: ID!
        name: String!
        description: String!
        valid: Int!
        createdAt: String!
        updatedAt: String!
    }

    input createTrainingInput {
        name: String!
        description: String!
        valid: Int!
    }

    input updateTrainingInput {
        name: String
        description: String
        valid: Int
    }

    type Historic {
        id: ID!
        userId: ID!
        trainingId: ID!
        createdAt: String!
        updatedAt: String!
    }

    input createHistoricInput {
        userId: ID!
        trainingId: ID!
    }

    input updateHistoricInput {
        userId: ID!
        trainingId: ID!
    }

    type Logs {
        id: ID!
        userId: ID!
        ip: String!
        request: String!
        createdAt: String!
        updatedAt: String!
    }

    input createLogInput {
        userId: ID!
        trainingId: ID!
    }

    type Query {
        user(id: ID!): User
        users: [User]!
        training(id: ID!): Trainings
        trainings: [Trainings]!
        historic(id: ID!): Historic
        historics: [Historic]!
        logs: [Logs]!
    }

    type Mutation {
        createUser(data: createUserInput!): User!
        updateUser(id: ID!, data: updateUserInput!): User!
        deleteUser(id: ID!): User!
        createTraining(data: createTrainingInput!): Trainings!
        updateTraining(id: ID!, data: updateTrainingInput!): Trainings!
        deleteTraining(id: ID!): Trainings!
        createHistoric(data: createHistoricInput!): Historic!
        updateHistoric(id: ID!, data: updateHistoricInput!): Historic!
        deleteHistoric(id: ID!): Historic!
        createLog(data: createLogInput!): Logs!
    }
`;