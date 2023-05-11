import { AppError } from "..";

export class InvalidUserError extends AppError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "InvalidUserError";
  }
}
