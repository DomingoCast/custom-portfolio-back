import DataForm from "../../../../infrastructure/share/validate/data-form.interface";
import validateUser from "./user.validate";

const validateRegister = (dataForm: DataForm) => {
    return validateUser(dataForm);
};
export default validateRegister;
