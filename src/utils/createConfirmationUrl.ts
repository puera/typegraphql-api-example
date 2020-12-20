import { redis } from '../config/redis'
import {uuid} from 'uuidv4'
import { redisPrefixes } from '../types/redisPrefixes'

export const createConfirmationUrl = async (userId: number) => {
  const token = uuid()
  await redis.set(redisPrefixes.confirmUser + token, userId, "ex", 60 * 60 * 24 ) //1 day expiration

  return `http://localhost:3000/user/confirm/${token}`
}