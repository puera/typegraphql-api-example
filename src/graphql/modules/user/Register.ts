import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from 'bcryptjs'
import { User } from "../../../models/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../../../middlewares/isAuth";
import { sendEmail } from "../../../utils/sendMail";
import { createConfirmationUrl } from "../../../utils/createConfirmationUrl";
import { MyContext } from "../../../types/MyContext";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  async hello(@Ctx() { req }: MyContext) {
    const user = await User.findOne(req.session.userId)
    
    return `Hello ${user?.name(user)}`
  }

  @Mutation(() => User)
  async register(
    @Arg('data') {firstName, lastName, email, password}: RegisterInput,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save()

    const url = await createConfirmationUrl(user.id)

    await sendEmail({ email, url })

    return user
  }
}