import validation from "../../../../infrastructure/share/validate/validate";
import schema from "./user-schema";

const validateRegister = (dataForm: any) => validation(schema, dataForm);
export default validateRegister;
