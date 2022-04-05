import { User } from "../domain/user/User";

interface UserRepository {
    // getById(id: string): Promise<User>;
    persist(user: Omit<User, "id">): Promise<void>;
}
export default UserRepository;
