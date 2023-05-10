import { AppError } from "..";

export class InvalidIDError extends AppError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "InvalidIDError";
  }
}
