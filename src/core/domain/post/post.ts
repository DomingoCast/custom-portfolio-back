import { Collection } from "../collection/collection";

export interface Post {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    collection: Collection;
}
