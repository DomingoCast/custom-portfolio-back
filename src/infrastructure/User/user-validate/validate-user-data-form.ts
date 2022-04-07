import validation from "../../share/validate/validate";
import userSchema from "./user-schema";
import CreateUserDataForm from "./interface/create-user-data-form.interface";

const validateUserDataForm = (CreateUserDataForm: CreateUserDataForm) =>
    validation(userSchema, CreateUserDataForm);
export default validateUserDataForm;
