import { Collection } from "../../../core/domain/collection/collection";
import CollectionModel from "./collection.model";
import { dataSource } from "../datasource";

const createCollectionRepository = () => {
    const collectionRepository = dataSource.getRepository(CollectionModel);
    const persist = (collection: Omit<Collection, "id">) => {
        return collectionRepository
            .save(collection)
            .then((res: Collection) => res)
            .catch(() => null);
    };
    return {
        persist,
    };
};

export default createCollectionRepository;
