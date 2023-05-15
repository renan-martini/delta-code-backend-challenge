import { MyContext } from "../../interfaces/context.interfaces";
import { ITransactionInput } from "../../interfaces/transaction.interfaces";
import { InvalidUserError } from "../../errors/InvalidUserError";
import { NotFoundError } from "../../errors/NotFoundError";
import { InsufficientMoneyError } from "../../errors/InsufficientMoneyError";
import { dateFormatter } from "../../utils/dateFormatter.utils";
import prisma from "../../data-source";
import { Prisma } from ".prisma/client";

export const createTransaction = async (
  _: any,
  { data }: { data: ITransactionInput },
  { validate }: MyContext
) => {
  const userId = validate();

  const debitedAccount = await prisma.user.findFirst({ where: { id: userId } });
  const receiverAccount = await prisma.user.findFirst({
    where: {
      email: data.debitedAccountEmail,
    },
  });
  if (!receiverAccount) throw new NotFoundError("User not found");
  if (userId == receiverAccount?.id)
    throw new InvalidUserError(
      "You cannot transfer money for your own account"
    );
  if (!debitedAccount?.isActive || !receiverAccount?.isActive)
    throw new InvalidUserError("User already deleted");

  if (debitedAccount.balance < new Prisma.Decimal(data.value))
    throw new InsufficientMoneyError("Insufficient balance");

  const receiverAccountUpdated = await prisma.user.update({
    where: { email: data.debitedAccountEmail },
    data: {
      ...receiverAccount,
      balance: receiverAccount.balance.add(data.value),
    },
  });
  const debitedAccountUpdated = await prisma.user.update({
    where: { id: userId },
    data: {
      ...debitedAccount,
      balance: debitedAccount.balance.sub(data.value),
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      receiverAccountId: receiverAccount.id,
      debitedAccountId: debitedAccount.id,
      value: data.value,
    },
    include: { debitedAccount: true, receiverAccount: true },
  });
  return dateFormatter("createdAt", transaction);
};
