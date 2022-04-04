import schema from "./schema";

const ajv = () => {
    const Ajv = require("ajv").default;
    const addFormats = require("ajv-formats");

    const ajv = new Ajv({ allErrors: true });
    require("ajv-errors")(ajv);
    addFormats(ajv);
    return ajv.compile(schema);
};
export default ajv;
