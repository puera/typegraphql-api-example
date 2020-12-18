import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema, Query, Resolver } from 'type-graphql'

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world!"
  }
}

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  })
  const apolloServer = new ApolloServer({
    schema
  })
  const app = express()

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => console.log('Server runing on http://localhost:4000/graphql'))
}

bootstrap()