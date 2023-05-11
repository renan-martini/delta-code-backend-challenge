import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { InvalidUserError } from "../../errors/InvalidUserError";
import { NoPermissionError } from "../../errors/NoPermissionError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyContext } from "../../interfaces/context.interfaces";
import { IUserCreate } from "../../interfaces/user.interfaces";
import { validateUUID } from "../../utils/uuid.utils";
import { dateFormatter } from "../../utils/dateFormatter.utils";
import { validateEmail } from "../../utils/validateEmail.utils";

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

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new NotFoundError("User not found");
  if (!user.isActive) throw new InvalidUserError("User deleted");
  if (data.password) {
    data.password = await hash(data.password, 10);
  }
  const updatedUser = await userRepository.save({ ...user, ...data });
  return dateFormatter("createdAt", updatedUser);
};
