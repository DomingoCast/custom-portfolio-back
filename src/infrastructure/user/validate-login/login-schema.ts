import { JSONSchemaType } from "ajv";
import { Login } from "../../../core/domain/user/login";

const loginSchema: JSONSchemaType<Login> = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            format: "email",
            errorMessage: "Invalid email",
        },
        password: {
            type: "string",
            minLength: 6,
            maxLength: 30,
            errorMessage: "Invalid password, minimum 6 and maximum 30",
        },
    },
};
export default loginSchema;
