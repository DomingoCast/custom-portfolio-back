import validation from "../../share/validate/validate";
import userSchema from "./user-schema";
import CreateUserDataForm from "./interface/create-user-data-form-interface";
import { ValidationResponse } from "../../share/validate/validation.types";

const validateUserDataForm = (
    createUserDataForm: CreateUserDataForm
): ValidationResponse =>
    validation<CreateUserDataForm>(userSchema, createUserDataForm);

export default validateUserDataForm;
