import { EntitySchema } from "typeorm";
import { Post } from "../../../core/domain/post/post";

const PostModel = new EntitySchema<Post>({
    name: "Post",
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
        collection: {
            type: "many-to-one",
            target: "Collection",
            joinColumn: true,
        },
    },
});

export default PostModel;
