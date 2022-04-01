const Ajv = require("ajv");

const ajv = new Ajv();

const validateRegister = (dataForm) => {
    const schema = {
        required: ["name", "surname", "email", "password", "phone", "address"],
        properties: {
            name: { type: "string", minLength: 3, maxLength: 30 },
            surname: { type: "string", minLength: 3, maxLength: 30 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6, maxLength: 30 },
            phone: {
                type: "string",
                pattern:
                    "(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})",
            },
            address: { type: "string", minLength: 3, maxLength: 30 },
        },
    };
    const data = {
        name: dataForm.name,
        surname: dataForm.surname,
        email: dataForm.email,
        password: dataForm.password,
        phone: dataForm.phone,
        address: dataForm.address,
    };
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) return valid;
    if (!valid) return validate.errors;
};
export default validateRegister;
