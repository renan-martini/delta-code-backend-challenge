import { validate } from "uuid";
import { InvalidIDError } from "../errors/InvalidIDError";

export const validateUUID = (uuid: string) => {
  if (!validate(uuid)) throw new InvalidIDError("Invalid UUID");
};
