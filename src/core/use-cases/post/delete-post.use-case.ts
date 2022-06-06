import { Post } from "../../domain/post/post";
import { User } from "../../domain/user/user";
import CollectionRepository from "../../ports/collection-repository.port";
import PostRepository from "../../ports/post-repository.port";

type CreatePostUseCaseProps = {
    postRepository: PostRepository;
    collectionRepository: CollectionRepository;
};
type CreatePostUseCase = (postId: string) => Promise<Post | null>;

const deletePostUseCase =
    ({ postRepository }: CreatePostUseCaseProps): CreatePostUseCase =>
    async (postId: string): Promise<Post | null> => {
        return await postRepository.deleteById(postId);
    };

export default deletePostUseCase;
