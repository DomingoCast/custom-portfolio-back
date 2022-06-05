import { Collection } from "../../domain/collection/collection";
import CustomError from "../../errors/custom-error";
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
        if (!posts) throw new CustomError("dios");
        return {
            collection: await collectionRepository.getById(collectionId),
            posts: posts,
        };
    };

export default getCollectionAndPostsUseCase;
