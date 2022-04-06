import DataForm from "../../../../infrastructure/share/validate/data-form.interface";
import ajv from "../../../../infrastructure/share/validate/ajv-validate";

const validateUser = (dataForm: DataForm) => {
    const validate = ajv();
    const valid = validate(dataForm);

    if (valid) return valid;
    return validate.errors;
};
export default validateUser;
