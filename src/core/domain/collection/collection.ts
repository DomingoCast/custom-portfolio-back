import { Post } from "../post/post";

export interface Collection {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    user: string;
    posts: Post[];
}
