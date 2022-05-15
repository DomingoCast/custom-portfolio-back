import { EntitySchema } from "typeorm";
import { Collection } from "../../../core/domain/collection/collection";

const CollectionModel = new EntitySchema<Collection>({
    name: "Collection",
    columns: {
        id: {
            primary: true,
            generated: "uuid",
            type: String,
        },
        title: {
            type: String,
            length: 30,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            joinColumn: true,
        },
        posts: {
            type: "one-to-many",
            target: "Post",
            inverseSide: "collection",
        },
    },
});

export default CollectionModel;
