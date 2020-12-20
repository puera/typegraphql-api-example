import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs'

import { redis } from "../../../config/redis";
import { User } from "../../../models/User";
import { createForgotPasswordConfirmation } from "../../../utils/createForgotPasswordConfirmation";
import { sendEmail } from "../../../utils/sendMail";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { redisPrefixes } from "../../../types/redisPrefixes";

@Resolver()
export class ChangePassworldResolver {
  @Mutation(() => User, { nullable: true })
  async forgotPassword(
    @Arg('data') {token, password}: ChangePasswordInput,
  ): Promise<User | undefined> {
    const userId = await redis.get(redisPrefixes.forgotPassword + token)

    if(!userId) return undefined

    const user = await User.findOne(userId)

    if(!user) return undefined

    await redis.del(redisPrefixes.forgotPassword + token)

    user.password = await bcrypt.hash(password, 12)

    await user.save()

    return user
  }
}