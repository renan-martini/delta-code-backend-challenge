import { RequestOptions } from "http";
import { verifyToken } from "../../utils/token.utils";
import { NoPermissionError } from "../../errors/NoPermissionError";

export const context = ({ req }: { req: RequestOptions }) => {
  const token = (req.headers!.authorization + "").split(" ")[1];
  return {
    validate() {
      try {
        const { id } = verifyToken(token) as { id: string };
        return id;
      } catch (error) {
        throw new NoPermissionError("Failed to authenticate");
      }
    },
  };
};
