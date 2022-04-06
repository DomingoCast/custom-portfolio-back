import { User } from "../domain/user/User";

interface UserRepository {
    // getById(id: string): Promise<User>;
    persist(user: Omit<User, "id">): Promise<void | User>;
}
export default UserRepository;
