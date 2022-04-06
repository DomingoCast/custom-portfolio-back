import DataForm from "../../../../infrastructure/share/validate/data-form.interface";
import validation from "../../../../infrastructure/share/validate/validate";
import schema from "./user-schema";

const validateRegister = (dataForm: DataForm) => validation(schema, dataForm);
export default validateRegister;
