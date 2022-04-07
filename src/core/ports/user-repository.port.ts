import { User } from "../domain/user/User";

interface UserRepository {
    persist(user: Omit<User, "id">): Promise<null | User>;
}
export default UserRepository;
