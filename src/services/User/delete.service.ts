import prisma from "../../data-source";
import { InvalidUserError } from "../../errors/InvalidUserError";
import { NoPermissionError } from "../../errors/NoPermissionError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyContext } from "../../interfaces/context.interfaces";
import { validateUUID } from "../../utils/uuid.utils";

export const deleteUser = async (
  _: any,
  { id }: { id: string },
  { validate }: MyContext
) => {
  validateUUID(id);
  const userId = validate();
  if (id != userId)
    throw new NoPermissionError("You cannot delete another account");
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundError("User not found");
  if (!user.isActive) throw new InvalidUserError("User already deleted");

  await prisma.user.update({ where: { id }, data: { isActive: false } });
  return true;
};
