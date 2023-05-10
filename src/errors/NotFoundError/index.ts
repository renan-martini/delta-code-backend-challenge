import { AppError } from "..";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "NotFoundError";
  }
}
