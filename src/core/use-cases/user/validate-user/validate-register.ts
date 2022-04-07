import validation from "../../../../infrastructure/share/validate/validate";
import schema from "./user-schema";

const validateRegister = (CreateUserByDataForm: any) =>
    validation(schema, CreateUserByDataForm);
export default validateRegister;
