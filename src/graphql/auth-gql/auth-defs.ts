import { gql } from "apollo-server-express";

const authTypeDefs = gql`

    input AuthSignUpInput {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
    }

    input AuthSignInInput{
        email: Int!
        password: String!
    }

    type AuthSignInPayload{
        user: User!
    }

    type AuthSignUpPayload{
        user: User!
    }

    type Mutation{
        authSignUp(input: AuthSignUpInput): AuthSignUpPayload!
        authSignIn(input: AuthSignInInput): AuthSignInPayload!
    }
`

export default authTypeDefs