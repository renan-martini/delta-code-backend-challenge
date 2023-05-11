import { Raw } from "typeorm";
import AppDataSource from "../../data-source";
import { Transaction } from "../../entities/transaction.entity";
import { DateFormatError } from "../../errors/DateFormatError";
import { MyContext } from "../../interfaces/context.interfaces";
import { isValidDate } from "../../utils/dateVerifyer.utils";
import { Day } from "../../interfaces/transaction.interfaces";
import { dateFormatter } from "../../utils/dateFormatter.utils";

export const listTransactions = async (
  _: any,
  { startDate, endDate }: { startDate: string; endDate?: any },
  { validate }: MyContext
) => {
  const userId = validate();
  if (!isValidDate(startDate) || (endDate && !isValidDate(endDate))) {
    throw new DateFormatError("Invalid date format (yyyy-mm-dd)");
  }
  if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
    throw new DateFormatError("End date must be after start date");
  }
  if (!endDate) {
    endDate = startDate.split("-");
    endDate[2] = parseInt(endDate[2]) + 1;
    endDate = endDate.join("-");
  }
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const transactions = await transactionRepository.find({
    where: [
      {
        createdAt: Raw(
          (data) => `${data} > :startDate AND ${data} < :endDate`,
          {
            startDate,
            endDate,
          }
        ),
        receiverAccount: {
          id: userId,
        },
      },
      {
        createdAt: Raw(
          (data) => `${data} > :startDate AND ${data} < :endDate`,
          {
            startDate,
            endDate,
          }
        ),
        debitedAccount: {
          id: userId,
        },
      },
    ],
    relations: {
      debitedAccount: true,
      receiverAccount: true,
    },
  });
  const days: Day[] = [];

  transactions.forEach((transaction) => {
    const dayIndex = days.findIndex(
      (day) => day.date == transaction.createdAt.toISOString().split("T")[0]
    );
    const hasReceived = transaction.receiverAccount.id === userId;
    const hasSent = transaction.debitedAccount.id === userId;
    if (dayIndex == -1) {
      days.push({
        date: transaction.createdAt.toISOString().split("T")[0],
        hasReceived,
        hasSent,
        transactions: [
          dateFormatter("createdAt", {
            ...transaction,
            type: hasReceived ? "IN" : "OUT",
          }),
        ],
      });
    } else {
      days[dayIndex].transactions.push(
        dateFormatter("createdAt", {
          ...transaction,
          type: hasReceived ? "IN" : "OUT",
        })
      );
      if (hasReceived) {
        days[dayIndex].hasReceived = true;
      }
      if (hasSent) {
        days[dayIndex].hasSent = true;
      }
    }
  });

  return days;
};
