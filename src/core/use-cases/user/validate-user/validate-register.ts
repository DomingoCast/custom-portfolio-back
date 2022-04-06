import DataForm from "../../../../infrastructure/share/validate/data-form.interface";
import validateUser from "./user-validate";

const validateRegister = (dataForm: DataForm): string | boolean => {
    return validateUser(dataForm);
};
export default validateRegister;
