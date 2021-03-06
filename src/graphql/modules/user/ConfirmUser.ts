import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../models/User";
import { redis } from "../../../config/redis";
import { redisPrefixes } from "../../../types/redisPrefixes";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg('token') token: string,
  ): Promise<boolean> {
    const userId = await redis.get(redisPrefixes.confirmUser + token)

    if(!userId) return false

    await User.update({id: Number(userId)}, { confirmed: true })
    await redis.del(token)

    return true
  }
}