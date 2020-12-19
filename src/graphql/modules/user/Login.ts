import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs'
import { User } from "../../../models/User";
import { MyContext } from "../../../types/MyContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { email } })
    if (!user) return undefined

    const validPass = await bcrypt.compare(password, user.password)

    if(!validPass) return undefined

    if(!user.confirmed) return undefined

    req.session.userId = user.id

    return user
  }
}