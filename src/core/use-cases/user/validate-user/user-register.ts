import DataForm from "../../../../infrastructure/share/validate/data-form.interface";
import validationDataUser from "./validate-register";

const validateUser = (dataForm: DataForm): string | boolean =>
    validationDataUser(dataForm);
export default validateUser;
