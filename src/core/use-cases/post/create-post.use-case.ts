import { Post } from "../../domain/post/post";
import { User } from "../../domain/user/user";
import CollectionRepository from "../../ports/collection-repository.port";
import PostRepository from "../../ports/post-repository.port";

type CreatePostUseCaseProps = {
    postRepository: PostRepository;
    collectionRepository: CollectionRepository;
};
type CreatePostUseCase = (
    post: Omit<Post, "id" | "posts">
) => Promise<Post | null>;

const registerUserUseCase =
    ({
        postRepository,
        collectionRepository,
    }: CreatePostUseCaseProps): CreatePostUseCase =>
    async (post: Omit<Post, "id" | "posts">): Promise<Post | null> => {
        return await postRepository.persist(post);
    };

export default registerUserUseCase;
