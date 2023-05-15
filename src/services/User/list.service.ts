import prisma from "../../data-source";
import { dateFormatter } from "../../utils/dateFormatter.utils";

export const listUsers = async () => {
  const users = await prisma.user.findMany({ where: { isActive: true } });
  return dateFormatter("createdAt", {}, users);
};
