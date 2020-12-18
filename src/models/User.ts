import { Field, ID, ObjectType } from "type-graphql";
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
  name: string

  @Column("text", { unique: true })
  @Field()
  email: string

  @Column()
  @Field()
  password: string

  @CreateDateColumn()
  @Field()
  created_at: Date

  @UpdateDateColumn()
  @Field()
  updated_at: Date
}