import { Transaction } from "../../../entities/transaction.entity";
import { createTransaction } from "../../../services/Transaction/create.service";
import { listTransactions } from "../../../services/Transaction/list.service";

export default {
  Query: {
    listTransactions,
  },
  Mutation: {
    createTransaction,
  },
};
