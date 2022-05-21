import InternalServerError from "../../../infrastructure/http-errors/internal-error";
import createPostRepository from "../../../infrastructure/persistance/post/post.datasource";
import { Collection } from "../../domain/collection/collection";
import CollectionRepository from "../../ports/collection-repository.port";
import PostRepository from "../../ports/post-repository.port";

type CreateCollectionUseCaseProps = {
    collectionRepository: CollectionRepository;
    postRepository: PostRepository;
};
type CreateCollectionUseCase = (
    collectionId: string
) => Promise<Collection | null>;

const getCollectionAndPostsUseCase =
    ({
        collectionRepository,
        postRepository,
    }: CreateCollectionUseCaseProps): CreateCollectionUseCase =>
    async (collectionId: string): Promise<any | null> => {
        console.log("[POSTS]");
        const posts = await postRepository.getByCollection(collectionId);
        if (!posts) throw new InternalServerError("dios");
        return {
            collection: await collectionRepository.getById(collectionId),
            posts: posts,
        };
    };

export default getCollectionAndPostsUseCase;
