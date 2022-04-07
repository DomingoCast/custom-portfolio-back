import validation from "../../../../infrastructure/share/validate/validate";
import userSchema from "./user-schema";

const validateRegister = (CreateUserByDataForm: any) =>
    validation(userSchema, CreateUserByDataForm);
export default validateRegister;
