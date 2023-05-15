import { hash } from "bcryptjs";
import { InvalidUserError } from "../../errors/InvalidUserError";
import { NoPermissionError } from "../../errors/NoPermissionError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyContext } from "../../interfaces/context.interfaces";
import { IUserCreate } from "../../interfaces/user.interfaces";
import { validateUUID } from "../../utils/uuid.utils";
import { dateFormatter } from "../../utils/dateFormatter.utils";
import { validateEmail } from "../../utils/validateEmail.utils";
import prisma from "../../data-source";

export const updateUser = async (
  _: any,
  { id, data }: { id: string; data: IUserCreate },
  { validate }: MyContext
) => {
  validateUUID(id);
  if (data.email) {
    validateEmail(data.email);
  }
  const userId = validate();
  if (id != userId)
    throw new NoPermissionError("You cannot update another account");

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundError("User not found");
  if (!user.isActive) throw new InvalidUserError("User deleted");
  if (data.password) {
    data.password = await hash(data.password, 10);
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { ...user, ...data },
  });
  return dateFormatter("createdAt", updatedUser);
};
