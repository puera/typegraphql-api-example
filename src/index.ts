import "reflect-metadata"
import "./database/connection"
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'

import { RegisterResolver } from "./graphql/modules/user/Register"
import { redis } from "./config/redis"
import { LoginResolver } from "./graphql/modules/user/Login"
import { MeResolver } from "./graphql/modules/user/Me"
import { ConfirmUserResolver } from "./graphql/modules/user/ConfirmUser"
import { ForgotPasswordResolver } from "./graphql/modules/user/ForgotPassword"

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [
      RegisterResolver, 
      LoginResolver, 
      MeResolver, 
      ConfirmUserResolver, 
      ForgotPasswordResolver,
      ConfirmUserResolver
      ]
  })
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req })
  })
  const app = express()
  const RedisStore = connectRedis(session);

  app.use(cors({
    credentials: true,
    origin: ['*']
  }))

  app.set('trust proxy', 1)
  app.use(session({
      store: new RedisStore({
        client: redis
      }),
      name: 'qid',
      secret: 'SECRET_KEY',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  )

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => {
    console.log('Server runing on http://localhost:4000/graphql')
  })
}

bootstrap()