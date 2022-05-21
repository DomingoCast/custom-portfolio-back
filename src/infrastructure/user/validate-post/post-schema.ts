import { JSONSchemaType } from "ajv";
import { Post } from "../../../core/domain/post/post";

const postSchema: JSONSchemaType<Omit<Post, "id" | "collection">> = {
    type: "object",
    required: ["title", "description", "thumbnail"],
    properties: {
        title: {
            type: "string",
            minLength: 3,
            maxLength: 30,
            errorMessage: "Invalid name, minimum 3 and maximum 30",
        },
        description: {
            type: "string",
            maxLength: 400,
            errorMessage: "Invalid description,maximum 400",
        },
        thumbnail: {
            type: "string",
        },
    },
};
export default postSchema;
