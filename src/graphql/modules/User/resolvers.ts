import { createUser } from "../../../services/User/create.service";
import { updateUser } from "../../../services/User/update.service";
import { deleteUser } from "../../../services/User/delete.service";
import { listUsers } from "../../../services/User/list.service";
import { retrieveUser } from "../../../services/User/retrieve.service";
import { login } from "../../../services/User/login.service";

export default {
  Query: {
    listUsers,
    retrieveUser,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
    login,
  },
};
