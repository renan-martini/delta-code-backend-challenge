import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: true,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
