import express from 'express'
import { graphqlHTTP } from 'express-graphql';
import schema from '../graphql/schema';

const router = express.Router()

router.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

const apiRoutes = router
export default apiRoutes