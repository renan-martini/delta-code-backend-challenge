import { AppError } from "..";

export class InsufficientMoneyError extends AppError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "InsufficientMoneyError";
  }
}
