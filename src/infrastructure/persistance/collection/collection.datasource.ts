import { Collection } from "../../../core/domain/collection/collection";
import CollectionModel from "./collection.model";
import { dataSource } from "../datasource";
import { User } from "../../../core/domain/user/user";

const createCollectionRepository = () => {
    const collectionRepository = dataSource.getRepository(CollectionModel);
    const persist = (collection: Omit<Collection, "id">) => {
        return collectionRepository
            .save(collection)
            .then((res: Collection) => res)
            .catch(() => null);
    };
    const getById = async (id: string): Promise<Collection | null> => {
        const response = await collectionRepository.findOneBy({
            id: id,
        });
        return response;
    };
    const getByUser = (user: User) => {
        return collectionRepository
            .find({ where: { user: { id: user.id } } as any })
            .then((res: Collection[]) => res)
            .catch(() => null);
    };
    return {
        persist,
        getByUser,
        getById,
    };
};

export default createCollectionRepository;
