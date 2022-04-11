import { JSONSchemaType } from "ajv";
import initValidation from "./init-validation";
import { ValidationResponse } from "./validation.types";

const validation = <T extends Object>(
    schema: JSONSchemaType<T>,
    data: T
): ValidationResponse => {
    const initValidate = initValidation(schema);
    const valid = initValidate.validate(schema, data);
    if (initValidate.errors)
        return initValidate.errors[0].message
            ? initValidate.errors[0].message
            : "And error has ocurred";
    return valid;
};
export default validation;
