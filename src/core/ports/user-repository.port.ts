import { User } from "../domain/user/User";

interface UserRepository {
    // getById(id: string): Promise<User>;
    persist(user: Omit<User, "id">): Promise<void | Omit<User, "id">>;
}
export default UserRepository;
