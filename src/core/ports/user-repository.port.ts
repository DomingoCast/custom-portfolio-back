import { User } from "../domain/user/User";

interface UserRepository {
    persist(user: Omit<User, "id">): Promise<void | User>;
}
export default UserRepository;
