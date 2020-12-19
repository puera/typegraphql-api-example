import {Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../models/User";
import { MyContext } from "../../../types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined
    }
    const user = await User.findOne(req.session.userId)
    
    return user
  }
}