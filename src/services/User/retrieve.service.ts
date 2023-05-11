import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyContext } from "../../interfaces/context.interfaces";
import { dateFormatter } from "../../utils/dateFormatter.utils";

export const retrieveUser = async (
  _: any,
  __: any,
  { validate }: MyContext
) => {
  const id = validate();
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id, isActive: true });
  if (!user) throw new NotFoundError("User not found");
  return dateFormatter("createdAt", user);
};
