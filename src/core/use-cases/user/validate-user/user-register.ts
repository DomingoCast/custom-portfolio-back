import CreateUserByDataForm from "./interface/create-user-by-data-form.interface";
import validationDataUser from "./validate-register";

const validateUser = (
    CreateUserByDataForm: CreateUserByDataForm
): string | boolean => validationDataUser(CreateUserByDataForm);
export default validateUser;
