import prisma from "../../data-source";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyContext } from "../../interfaces/context.interfaces";
import { dateFormatter } from "../../utils/dateFormatter.utils";

export const retrieveUser = async (
  _: any,
  __: any,
  { validate }: MyContext
) => {
  const id = validate();
  const user = await prisma.user.findFirst({ where: { id, isActive: true } });
  if (!user) throw new NotFoundError("User not found");
  return dateFormatter("createdAt", user);
};
