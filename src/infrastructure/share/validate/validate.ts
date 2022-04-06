import schema from "../../../core/use-cases/user/validate-user/schema";

const validation = () => {
    const Ajv = require("ajv").default;
    const addFormats = require("ajv-formats");

    const ajv = new Ajv({ allErrors: true });
    require("ajv-errors")(ajv);
    addFormats(ajv);
    return ajv.compile(schema);
};
export default validation;
