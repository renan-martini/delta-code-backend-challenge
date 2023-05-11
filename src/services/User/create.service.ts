import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { EmailError } from "../../errors/EmailError";
import { MyContext } from "../../interfaces/context.interfaces";
import { hash } from "bcryptjs";
import { IUserCreate } from "../../interfaces/user.interfaces";
import { dateFormatter } from "../../utils/dateFormatter.utils";
import { validateEmail } from "../../utils/validateEmail.utils";

export const createUser = async (
  _: any,
  {
    data,
  }: {
    data: IUserCreate;
  }
) => {
  validateEmail(data.email);
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

  return dateFormatter("createdAt", user);
};
