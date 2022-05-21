import { Collection } from "../../domain/collection/collection";
import { User } from "../../domain/user/user";
import CollectionRepository from "../../ports/collection-repository.port";

type CreateCollectionUseCaseProps = {
    collectionRepository: CollectionRepository;
};
type CreateCollectionUseCase = (
    collection: Omit<Collection, "id" | "posts">
) => Promise<Collection | null>;

const registerUserUseCase =
    ({
        collectionRepository,
    }: CreateCollectionUseCaseProps): CreateCollectionUseCase =>
    async (
        collection: Omit<Collection, "id" | "posts">
    ): Promise<Collection | null> => {
        return await collectionRepository.persist(collection);
    };

export default registerUserUseCase;
