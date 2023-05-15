import { DateFormatError } from "../../errors/DateFormatError";
import { MyContext } from "../../interfaces/context.interfaces";
import { isValidDate } from "../../utils/dateVerifyer.utils";
import { Day } from "../../interfaces/transaction.interfaces";
import { dateFormatter } from "../../utils/dateFormatter.utils";
import prisma from "../../data-source";

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
  } else {
    endDate = endDate.split("-");
    endDate[2] = parseInt(endDate[2]) + 1;
    endDate = endDate.join("-");
  }
  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        {
          receiverAccount: {
            id: userId,
          },
        },
        {
          debitedAccount: {
            id: userId,
          },
        },
      ],
      createdAt: { lte: new Date(endDate), gte: new Date(startDate) },
    },
    include: {
      debitedAccount: true,
      receiverAccount: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const days: Day[] = [];

  transactions.forEach((transaction) => {
    const dayIndex = days.findIndex(
      (day) => day.date == transaction.createdAt.toISOString().split("T")[0]
    );
    const hasReceived = transaction.receiverAccount!.id === userId;
    const hasSent = transaction.debitedAccount!.id === userId;
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
