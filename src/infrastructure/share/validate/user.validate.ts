import DataForm from "./data-form.interface";
import ajv from "./ajv-validate";

const validateUser = (dataForm: DataForm) => {
    const validate = ajv();
    const valid = validate(dataForm);

    if (valid) return valid;
    return validate.errors;
};
export default validateUser;
