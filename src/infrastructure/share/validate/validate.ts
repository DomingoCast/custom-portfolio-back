import { JSONSchemaType } from "ajv";
import initValidation from "./init-validation";
import { ValidationResponse } from "./validation.types";
import trimFields from "../trim-fields/trim-fields";
import { User } from "../../../core/domain/user/user";

const validation = <T extends Object>(
    schema: JSONSchemaType<T>,
    data: Omit<User, "id">
): ValidationResponse => {
    const trimData = trimFields(data);
    const initValidate = initValidation(schema);
    const valid = initValidate.validate(schema, trimData);
    if (initValidate.errors)
        return initValidate.errors[0].message
            ? initValidate.errors[0].message
            : "And error has ocurred";
    return valid;
};
export default validation;
