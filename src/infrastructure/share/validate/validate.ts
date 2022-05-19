import { JSONSchemaType, Schema } from "ajv";
import initValidation from "./init-validation";
import { ValidationResponse } from "./validation.types";

const validation = <T extends Schema>(
    schema: JSONSchemaType<T>,
    data: T
): ValidationResponse => {
    const initValidate = initValidation(schema);
    const valid = initValidate.validate(schema, data);
    if (!valid) return initValidate.errors!.map((error) => error.message!);
    return valid;
};
export default validation;
