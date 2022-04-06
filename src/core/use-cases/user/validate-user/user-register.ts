import DataForm from "../../../../infrastructure/share/validate/data-form.interface";
import validation from "./validate-register";

const validateUser = (dataForm: DataForm): string | boolean =>
    validation(dataForm);
export default validateUser;
