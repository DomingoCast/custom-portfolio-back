const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");

const initValidation = (schema: Object) => {
    const ajv = new Ajv({ allErrors: true });
    require("ajv-errors")(ajv);
    addFormats(ajv);
    ajv.compile(schema);
    return ajv;
};
export default initValidation;
