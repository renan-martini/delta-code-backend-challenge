import { DataSource } from "typeorm";

export interface MyContext {
  validate: () => string;
}
