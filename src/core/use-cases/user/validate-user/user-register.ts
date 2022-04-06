import DataForm from "../../../../infrastructure/share/validate/data-form.interface";
import validateRegister from "./validate-register";

const validateUser = (dataForm: DataForm): string | boolean => {
    return validateRegister(dataForm);
};
export default validateUser;
