import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { InvalidUserError } from "../../errors/InvalidUserError";
import { compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { createToken } from "../../utils/token.utils";

export const login = async (
  _: any,
  {
    data,
  }: {
    data: ILogin;
  }
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: data.email,
  });
  if (!user) {
    throw new InvalidUserError("Invalid email or password");
  }

  const matchPassword = await compare(data.password, user.password);

  if (!matchPassword) {
    throw new InvalidUserError("Invalid email or password");
  }

  const token = createToken(user.id);

  return { token };
};
