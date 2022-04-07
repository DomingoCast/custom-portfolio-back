import DataForm from "./data-form.interface";
import initValidation from "./init-validation";

const validationDataUser = (schema: Object, data: DataForm) => {
    const initValidate = initValidation(schema);
    const valid = initValidate.validate(schema, data);
    if (!valid) return initValidate.errors[0].message;
    return valid;
};
export default validationDataUser;
