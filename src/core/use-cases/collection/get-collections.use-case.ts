import { Collection } from "../../domain/collection/collection";
import { User } from "../../domain/user/user";
import CollectionRepository from "../../ports/collection-repository.port";

type CreateCollectionUseCaseProps = {
    collectionRepository: CollectionRepository;
};
type CreateCollectionUseCase = (user: User) => Promise<Collection[] | null>;

const getCollectionsUseCase =
    ({
        collectionRepository,
    }: CreateCollectionUseCaseProps): CreateCollectionUseCase =>
    async (user: User): Promise<Collection[] | null> => {
        return await collectionRepository.getByUser(user);
    };

export default getCollectionsUseCase;
