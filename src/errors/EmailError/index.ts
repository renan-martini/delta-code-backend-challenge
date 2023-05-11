import { AppError } from "..";

export class EmailError extends AppError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "EmailError";
  }
}
