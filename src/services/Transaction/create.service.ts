import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { MyContext } from "../../interfaces/context.interfaces";
import { ITransactionInput } from "../../interfaces/transaction.interfaces";
import { InvalidUserError } from "../../errors/InvalidUserError";
import { NotFoundError } from "../../errors/NotFoundError";
import { InsufficientMoneyError } from "../../errors/InsufficientMoneyError";
import { Transaction } from "../../entities/transaction.entity";
import { dateFormatter } from "../../utils/dateFormatter.utils";

export const createTransaction = async (
  _: any,
  { data }: { data: ITransactionInput },
  { validate }: MyContext
) => {
  const userId = validate();
  const userRepository = AppDataSource.getRepository(User);
  const transactionRepository = AppDataSource.getRepository(Transaction);

  const debitedAccount = await userRepository.findOneBy({ id: userId });
  const receiverAccount = await userRepository.findOneBy({
    email: data.debitedAccountEmail,
  });
  if (!receiverAccount) throw new NotFoundError("User not found");
  if (userId == receiverAccount?.id)
    throw new InvalidUserError(
      "You cannot transfer money for your own account"
    );
  if (!debitedAccount?.isActive || !receiverAccount?.isActive)
    throw new InvalidUserError("User already deleted");

  if (debitedAccount.balance < data.value)
    throw new InsufficientMoneyError("Insufficient balance");

  const receiverAccountUpdated = await userRepository.save({
    ...receiverAccount,
    balance: receiverAccount.balance + data.value,
  });
  const debitedAccountUpdated = await userRepository.save({
    ...debitedAccount,
    balance: debitedAccount.balance - data.value,
  });

  const transaction = transactionRepository.create({
    receiverAccount: receiverAccountUpdated,
    debitedAccount: debitedAccountUpdated,
    value: data.value,
  });
  await transactionRepository.save(transaction);
  return dateFormatter("createdAt", transaction);
};
