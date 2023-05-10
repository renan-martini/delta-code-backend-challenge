import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { EmailError } from "../../errors/EmailError";
import { MyContext } from "../../interfaces/context.interfaces";
import { hash } from "bcryptjs";

export const createUser = async (
  _: any,
  {
    data,
  }: {
    data: IUserCreate;
  }
) => {
  const userRepository = AppDataSource.getRepository(User);
  const repeatedUser = await userRepository.findOneBy({
    email: data.email,
  });
  if (repeatedUser) {
    throw new EmailError("User already signed");
  }
  const hashedPassword = await hash(data.password, 10);
  const user = userRepository.create({
    ...data,
    password: hashedPassword,
  });
  await userRepository.save(user);

  return user;
};
