import prisma from "../../data-source";
import { EmailError } from "../../errors/EmailError";
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
  const repeatedUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (repeatedUser) {
    throw new EmailError("User already signed");
  }
  const hashedPassword = await hash(data.password, 10);
  const user = await prisma.user
    .create({ data: { ...data, password: hashedPassword } })
    .catch((e) => {
      throw new Error(e);
    });

  return dateFormatter("createdAt", user);
};
