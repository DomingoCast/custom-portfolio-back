import validation from "../../share/validate/validate";
import userSchema from "./user-schema";
import { ValidationResponse } from "../../share/validate/validation.types";
import { RegisterInfo } from "../../../core/domain/user/register-info";

const validateUser = (user: RegisterInfo): ValidationResponse =>
    validation<RegisterInfo>(userSchema, user);

export default validateUser;
