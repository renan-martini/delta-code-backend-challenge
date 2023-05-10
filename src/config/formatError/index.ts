import { GraphQLError } from "graphql";
import { AppError } from "../../errors";

export const formatError = (error: GraphQLError) => {
  if (error.originalError instanceof AppError) {
    return new Error(error.message);
  }
  return error;
};
