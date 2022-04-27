import { User } from "../domain/user/user";

interface UserRepository {
    persist(user: Omit<User, "id">): Promise<null | User>;
}
export default UserRepository;
