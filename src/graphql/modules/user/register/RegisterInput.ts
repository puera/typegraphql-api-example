import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { isEmailAlreadyExist } from "./isEmailAlReadyExists";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  @isEmailAlreadyExist({ message: "email already in use" })
  email: string

  @Field()
  @MinLength(4)
  password: string
}