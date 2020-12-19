import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string
  
  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Column("text", { unique: true })
  @Field()
  email: string

  @Column()
  @Field()
  password: string

  @Column("bool", { default: false })
  confirmed: boolean

  @CreateDateColumn()
  @Field()
  created_at: Date

  @UpdateDateColumn()
  @Field()
  updated_at: Date
}