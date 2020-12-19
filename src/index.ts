import "reflect-metadata"
import "./database/connection"
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { RegisterResolver } from "./graphql/modules/user/Register"

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  })
  const apolloServer = new ApolloServer({
    schema,
  })
  const app = express()

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => console.log('Server runing on http://localhost:4000/graphql'))
}

bootstrap()