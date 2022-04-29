import { User } from "../domain/user/user";

interface UserRepository {
    persist(user: Omit<User, "id">): Promise<null | User>;
    findEmail(email: string): Promise<boolean>;
}
export default UserRepository;
