import CreateUserByDataForm from "../../../core/use-cases/user/validate-user/create-user-by-data-form.interface";
import initValidation from "./init-validation";

const validationDataUser = (schema: Object, data: CreateUserByDataForm) => {
    const initValidate = initValidation(schema);
    const valid = initValidate.validate(schema, data);
    if (!valid) return initValidate.errors[0].message;
    return valid;
};
export default validationDataUser;
