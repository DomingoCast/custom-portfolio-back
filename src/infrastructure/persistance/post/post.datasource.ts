import { Post } from "../../../core/domain/post/post";
import PostModel from "./post.model";
import { dataSource } from "../datasource";
import { Collection } from "../../../core/domain/collection/collection";

const createPostRepository = () => {
    const postRepository = dataSource.getRepository(PostModel);
    const getByCollection = (user: Collection) => {
        return postRepository
            .find({ where: { user: { id: user.id } } as any })
            .then((res: Post[]) => res)
            .catch(() => null);
    };
    const persist = (post: Omit<Post, "id">) => {
        return postRepository
            .save(post)
            .then((res: Post) => res)
            .catch(() => null);
    };
    return {
        persist,
    };
};

export default createPostRepository;
