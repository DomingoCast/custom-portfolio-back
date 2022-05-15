import { Post } from "../../../core/domain/post/post";
import PostModel from "./post.model";
import { dataSource } from "../datasource";

const createPostRepository = () => {
    const postRepository = dataSource.getRepository(PostModel);
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
