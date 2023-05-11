import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DecimalTransformer } from "../utils/decimalTransformer.utils";
import { Transaction } from "./transaction.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 100.0,
    transformer: new DecimalTransformer(),
  })
  balance: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  pictureUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  cashOuts: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiverAccount)
  cashIns: Transaction[];
}
