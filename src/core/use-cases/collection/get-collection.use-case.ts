import { Collection } from "../../domain/collection/collection";
import CollectionRepository from "../../ports/collection-repository.port";

type CreateCollectionUseCaseProps = {
    collectionRepository: CollectionRepository;
};
type CreateCollectionUseCase = (
    collectionId: string
) => Promise<Collection | null>;

const getCollectionUseCase =
    ({
        collectionRepository,
    }: CreateCollectionUseCaseProps): CreateCollectionUseCase =>
    async (collectionId: string): Promise<Collection | null> => {
        return await collectionRepository.getById(collectionId);
    };

export default getCollectionUseCase;
