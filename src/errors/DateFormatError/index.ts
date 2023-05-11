import { AppError } from "..";

export class DateFormatError extends AppError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "DateFormatError";
  }
}
