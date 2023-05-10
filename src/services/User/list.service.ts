import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

export const listUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ where: { isActive: true } });
  return users;
};
