import { InvalidUserError } from "../../errors/InvalidUserError";
import { compare } from "bcryptjs";
import { createToken } from "../../utils/token.utils";
import { ILogin } from "../../interfaces/user.interfaces";
import prisma from "../../data-source";

export const login = async (
  _: any,
  {
    data,
  }: {
    data: ILogin;
  }
) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    throw new InvalidUserError("Invalid email or password");
  }

  if (!user.isActive) throw new InvalidUserError("User deleted");

  const matchPassword = await compare(data.password, user.password);

  if (!matchPassword) {
    throw new InvalidUserError("Invalid email or password");
  }

  const token = createToken(user.id);

  return { token };
};
