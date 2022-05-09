import validation from "../../share/validate/validate";
import userSchema from "./user-schema";
import { ValidationResponse } from "../../share/validate/validation.types";
import { User } from "../../../core/domain/user/user";

const validateUser = (user: Omit<User, "id">): ValidationResponse =>
    validation<Omit<User, "id">>(userSchema, user);

export default validateUser;
