import { RegisterInfo } from "../domain/user/register-info";
import { User } from "../domain/user/user";

interface UserRepository {
    persist(user: Omit<User, "id">): Promise<null | User>;
    findByEmail(email: string): Promise<null | User>;
}
export default UserRepository;
