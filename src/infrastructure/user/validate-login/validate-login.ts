import { Login } from "../../../core/domain/user/login";
import validation from "../../share/validate/validate";
import { ValidationResponse } from "../../share/validate/validation.types";
import loginSchema from "./login-schema";

const validateLogin = (login: Login): ValidationResponse =>
    validation<Login>(loginSchema, login);

export default validateLogin;
