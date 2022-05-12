import validation from "../../share/validate/validate";
import { ValidationResponse } from "../../share/validate/validation.types";
import passwordSchema from "../validate-login/passwordSchema";

interface PasswordObject {
    password: string;
}
const validatePassword = (passwordObject: PasswordObject): ValidationResponse =>
    validation<PasswordObject>(passwordSchema, passwordObject);

export default validatePassword;
