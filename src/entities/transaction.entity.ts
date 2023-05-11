import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DecimalTransformer } from "../utils/decimalTransformer.utils";
import { User } from "./user.entity";

@Entity("transaction")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  debitedAccount: User;

  @ManyToOne(() => User)
  receiverAccount: User;
}
