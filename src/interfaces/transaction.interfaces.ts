import { User } from "../entities/user.entity";

export interface ITransactionInput {
  value: number;
  debitedAccountEmail: string;
}

export interface Transaction {
  id: string;
  value: number;
  createdAt: string;
  debitedAccount: User;
  receiverAccount: User;
}
export interface Day {
  date: string;
  hasSent: boolean;
  hasReceived: boolean;
  transactions: Transaction[];
}
