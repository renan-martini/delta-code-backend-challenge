import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

const allTypes = loadFilesSync(join(__dirname, "modules", "**", "*.gql"));
const allResolvers = loadFilesSync(
  join(__dirname, "modules", "**", "resolvers.ts")
);

export const typeDefs = mergeTypeDefs(allTypes);
export const resolvers = mergeResolvers(allResolvers);
