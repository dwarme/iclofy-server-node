import { gql } from "apollo-server-express";

const userTypeDefs = gql`
    type User{
        id: String!
        firstname: String!
        lastname: String!
        email: String!
    }

    type UserPayload{
        user: User!
    }

    input UserUpdateNameInput{
        firstname: String!
        lastname: String!
    }

    input UserUpdatePasswordInput{
        password_old: String!
        password_new: String!
    }

    type Query{
        user: UserPayload!
    }

    type Mutation{
        userUpdateName(input: ): UserPayload!
        userUpdateEmail(email: String): UserPayload!
        userUpdatePassword(input: UserUpdatePasswordInput): UserPayload!
    }
`

export default userTypeDefs;