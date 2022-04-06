import DataForm from "../../../../infrastructure/share/validate/data-form.interface";
import validation from "../../../../infrastructure/share/validate/validate";

const validateUser = (dataForm: DataForm) => {
    const validate = validation();
    const valid = validate(dataForm);

    if (valid) return valid;
    return validate.errors;
};
export default validateUser;
