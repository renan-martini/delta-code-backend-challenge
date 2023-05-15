import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql";
import prisma from "./data-source";
import config from "./config";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  ...config,
});

(async () => {
  await server
    .listen()
    .then(({ url }) => console.log(`Server running on: ${url}`));
})().then(async () => {
  await prisma.$disconnect();
});
