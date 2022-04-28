import addFormats from "ajv-formats";
import Ajv from "ajv";

const initValidation = (userSchema: Object): Ajv => {
    const ajv = new Ajv({ allErrors: true });
    require("ajv-errors")(ajv);
    require("ajv-keywords")(ajv, ["transform"]);
    addFormats(ajv);
    ajv.compile(userSchema);
    return ajv;
};
export default initValidation;
