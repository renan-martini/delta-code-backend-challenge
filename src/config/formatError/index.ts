import { GraphQLError } from "graphql";
import { AppError } from "../../errors";

export const formatError = (error: GraphQLError) => {
  if (error.originalError instanceof AppError) {
    return { message: error.message, type: error.originalError.name };
  }
  return error;
};
