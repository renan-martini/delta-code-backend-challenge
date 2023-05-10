import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { NotFoundError } from "../../errors/NotFoundError";
import { validateUUID } from "../../utils/uuid.utils";

export const retrieveUser = async (_: any, { id }: { id: string }) => {
  validateUUID(id);
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id, isActive: true });
  if (!user) throw new NotFoundError("User not found");
  return user;
};

export const teste = 1;
