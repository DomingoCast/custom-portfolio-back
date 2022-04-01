import { User } from "../domain/user/User";

interface UserRepository {
    // getById(id: string): Promise<User>;
    persist(user: User): Promise<void>;
}
export default UserRepository;
