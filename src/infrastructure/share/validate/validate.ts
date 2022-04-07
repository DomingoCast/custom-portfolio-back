import CreateUserDataForm from "../../user/user-validate/interface/create-user-data-form.interface";
import initValidation from "./init-validation";

const validationDataUser = (
    userSchema: Object,
    data: CreateUserDataForm
): boolean | string => {
    const initValidate = initValidation(userSchema);
    const valid = initValidate.validate(userSchema, data);
    if (initValidate.errors)
        return initValidate.errors[0].message
            ? initValidate.errors[0].message
            : "And error has ocurred";
    return valid;
};
export default validationDataUser;
