import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql";
import AppDataSource from "./data-source";
import config from "./config";
import { MyContext } from "./interfaces/context.interfaces";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  ...config,
});

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
  await server
    .listen()
    .then(({ url }) => console.log(`Server running on: ${url}`));
})();
