import DataForm from "./data-form.interface";
import init from "./init-validate";

const validation = (schema: Object, data: DataForm) => {
    const initValidate = init(schema);
    const valid = initValidate.validate(schema, data);
    if (!valid) return initValidate.errors[0].message;
    return valid;
};
export default validation;
