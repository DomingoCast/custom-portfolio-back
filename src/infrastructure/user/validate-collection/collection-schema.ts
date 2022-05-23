import { JSONSchemaType } from "ajv";
import { Collection } from "../../../core/domain/collection/collection";

const collectionSchema: JSONSchemaType<
    Omit<Collection, "id" | "posts" | "user" | "thumbnail">
> = {
    type: "object",
    required: ["title", "description"],
    properties: {
        title: {
            type: "string",
            minLength: 3,
            maxLength: 30,
            errorMessage: "Invalid name, minimum 3 and maximum 30",
        },
        description: {
            type: "string",
            minLength: 3,
            maxLength: 400,
            errorMessage: "Invalid surname, minimum 3 and maximum 400",
        },
    },
};
export default collectionSchema;
