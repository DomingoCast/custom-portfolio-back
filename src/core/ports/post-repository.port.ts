import { Post } from "../domain/post/post";
import { User } from "../domain/user/user";

interface PostRepository {
    persist(collection: Omit<Post, "id">): Promise<null | Post>;
    getByCollection(user: User): Promise<null | Post[]>;
}
export default PostRepository;
