const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv /*, {singleError: true} */);
addFormats(ajv);

const validateRegister = (dataForm = "") => {
    if (dataForm === "") return false;
    const schema = {
        type: "object",
        required: ["name", "surname", "email", "password", "phone", "address"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 30,
                errorMessage: "Invalid name, minimum 3 and maximum 30",
            },
            surname: {
                type: "string",
                minLength: 3,
                maxLength: 30,
                errorMessage: "Invalid surname, minimum 3 and maximum 30",
            },
            email: {
                type: "string",
                format: "email",
                errorMessage: "Invalid email",
            },
            password: {
                type: "string",
                minLength: 6,
                maxLength: 30,
                errorMessage: "Invalid surname, minimum 6 and maximum 30",
            },
            phone: {
                type: "string",
                minLength: 9,
                maxLength: 15,
                pattern:
                    "(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})",
                errorMessage: "Invalid phone number, minimum 9 and maximum 15",
            },
            address: { type: "string", minLength: 3, maxLength: 30 },
        },
    };
    const validate = ajv.compile(schema);
    const valid = validate(dataForm);

    if (valid) return valid;
    if (!valid) return validate.errors;
};
module.exports = { validateRegister };
