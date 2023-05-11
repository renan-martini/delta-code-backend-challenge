import { EmailError } from "../errors/EmailError";

export const validateEmail = (email: string) => {
  const mailFormat =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(mailFormat)) {
    throw new EmailError("Invalid email address");
  }
  return email;
};
