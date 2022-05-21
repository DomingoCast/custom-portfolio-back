import validation from "../../share/validate/validate";
import { ValidationResponse } from "../../share/validate/validation.types";
import { Post } from "../../../core/domain/post/post";
import postSchema from "./post-schema";

const validatePost = (
    post: Omit<Post, "id" | "posts" | "user">
): ValidationResponse =>
    validation<Omit<Post, "id" | "collection">>(postSchema, post);

export default validatePost;
