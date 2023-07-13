import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import authTypeDefs from "./auth-gql/auth-defs";
import userTypeDefs from "./user-gql/user-defs";
import postTypeDefs from "./post-gql/post-defs";
import authResolvers from "./auth-gql/auth-resolvers";
import userResolvers from "./user-gql/user-resolvers";
import postResolvers from "./post-gql/post-resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = mergeTypeDefs([
    authTypeDefs,
    userTypeDefs,
    postTypeDefs
])

const resolvers = mergeResolvers([
    authResolvers,
    userResolvers,
    postResolvers
])

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema;