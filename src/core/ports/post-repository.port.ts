import { Post } from "../domain/post/post";

interface PostRepository {
    persist(user: Omit<Post, "id">): Promise<null | Post>;
    getByCollection(postId: string): Promise<null | Post[]>;
    deleteById(postId: string): Promise<null | Post>;
}
export default PostRepository;
