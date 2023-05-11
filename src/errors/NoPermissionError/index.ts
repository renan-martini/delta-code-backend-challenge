import { AppError } from "..";

export class NoPermissionError extends AppError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "NoPermissionError";
  }
}
