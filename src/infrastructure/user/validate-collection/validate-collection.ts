import validation from "../../share/validate/validate";
import { ValidationResponse } from "../../share/validate/validation.types";
import { Collection } from "../../../core/domain/collection/collection";
import collectionSchema from "./collection-schema";

const validateCollection = (
    collection: Omit<Collection, "id" | "posts">
): ValidationResponse =>
    validation<Omit<Collection, "id" | "posts">>(collectionSchema, collection);

export default validateCollection;
