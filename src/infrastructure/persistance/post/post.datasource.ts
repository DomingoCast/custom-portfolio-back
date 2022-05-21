import { Post } from "../../../core/domain/post/post";
import PostModel from "./post.model";
import { dataSource } from "../datasource";
import { Collection } from "../../../core/domain/collection/collection";
import { UsingJoinColumnOnlyOnOneSideAllowedError } from "typeorm";
import PostRepository from "../../../core/ports/post-repository.port";

const createPostRepository = (): PostRepository => {
    const postRepository = dataSource.getRepository(PostModel);
    const getByCollection = (collectionId: string): Promise<Post[] | any> => {
        return postRepository
            .find({ where: { collection: { id: collectionId } } as any })
            .then((res: Post[]) => res)
            .catch((e) => console.log("[joder]"));
    };
    const persist = (post: Omit<Post, "id">) => {
        return postRepository
            .save(post)
            .then((res: Post) => res)
            .catch((e) => null);
    };
    return {
        persist,
        getByCollection,
    };
};

export default createPostRepository;
