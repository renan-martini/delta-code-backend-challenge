import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { dateFormatter } from "../../utils/dateFormatter.utils";

export const listUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ where: { isActive: true } });
  return dateFormatter("createdAt", {}, users);
};
