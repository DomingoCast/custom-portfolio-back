import { JSONSchemaType } from "ajv";
import CreateUserDataForm from "./interface/create-user-data-form-interface";

const userSchema: JSONSchemaType<CreateUserDataForm> = {
    type: "object",
    required: ["name", "surname", "email", "password", "phone", "address"],
    properties: {
        name: {
            type: "string",
            transform: ["trim"],
            pattern: "^[a-zA-Z0-9]+$",
            minLength: 3,
            maxLength: 30,
            errorMessage: "Invalid name, minimum 3 and maximum 30",
        },
        surname: {
            type: "string",
            transform: ["trim"],
            pattern: "^[a-zA-Z0-9]+$",
            minLength: 3,
            maxLength: 30,
            errorMessage: "Invalid surname, minimum 3 and maximum 30",
        },
        email: {
            type: "string",
            transform: ["trim"],
            format: "email",
            errorMessage: "Invalid email",
        },
        password: {
            type: "string",
            minLength: 6,
            maxLength: 30,
            errorMessage: "Invalid password, minimum 6 and maximum 30",
        },
        phone: {
            type: "string",
            transform: ["trim"],
            minLength: 9,
            maxLength: 15,
            pattern:
                "(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})",
            errorMessage: "Invalid phone number, minimum 9 and maximum 15",
        },
        address: {
            type: "string",
            minLength: 3,
            maxLength: 30,
            transform: ["trim"],
        },
    },
};
export default userSchema;
