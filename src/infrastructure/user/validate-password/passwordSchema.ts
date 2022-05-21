import { JSONSchemaType } from "ajv";

const passwordSchema: JSONSchemaType<{ password: string }> = {
    type: "object",
    required: ["password"],
    properties: {
        password: {
            type: "string",
            minLength: 6,
            maxLength: 30,
            errorMessage: "Invalid password, minimum 6 and maximum 30",
        },
    },
};
export default passwordSchema;
