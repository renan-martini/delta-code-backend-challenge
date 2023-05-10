import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { InvalidUserError } from "../../errors/InvalidUserError";
import { NoPermissionError } from "../../errors/NoPermissionError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyContext } from "../../interfaces/context.interfaces";
import { validateUUID } from "../../utils/uuid.utils";

export const updateUser = async (
  _: any,
  { id, data }: { id: string; data: IUserCreate },
  { validate }: MyContext
) => {
  validateUUID(id);
  const userId = validate();
  if (id != userId)
    throw new NoPermissionError("You cannot update another account");

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new NotFoundError("User not found");
  if (!user.isActive) throw new InvalidUserError("User deleted");

  const updatedUser = await userRepository.save({ ...user, ...data });
  return updatedUser;
};
