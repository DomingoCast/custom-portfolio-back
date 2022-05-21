import { Post } from "../domain/post/post";
import { User } from "../domain/user/user";

interface PostRepository {
    persist(user: Omit<Post, "id">): Promise<null | Post>;
    getByCollection(collectionId: string): Promise<null | Post[]>;
}
export default PostRepository;
