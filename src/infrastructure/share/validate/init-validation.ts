import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import Ajv from "ajv";

const initValidation = (userSchema: Object): Ajv => {
    const ajv = new Ajv({ allErrors: true });
    ajvErrors(ajv);
    addFormats(ajv);
    ajv.compile(userSchema);
    return ajv;
};
export default initValidation;
