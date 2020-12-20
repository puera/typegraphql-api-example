import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../models/User";
import { createForgotPasswordConfirmation } from "../../../utils/createForgotPasswordConfirmation";
import { sendEmail } from "../../../utils/sendMail";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
  ): Promise<boolean> {
    const user = await User.findOne({where: { email }})

    if (!user) return true

    const url = await createForgotPasswordConfirmation(user.id)
    await sendEmail({email, url})

    return true
  }
}