import { Collection } from "../domain/collection/collection";
import { User } from "../domain/user/user";

interface CollectionRepository {
    persist(
        collection: Omit<Collection, "id" | "posts" | "user">
    ): Promise<null | Collection>;
    getById(collectionId: string): Promise<null | Collection>;
    getByUser(user: User): Promise<null | Collection[]>;
}
export default CollectionRepository;
