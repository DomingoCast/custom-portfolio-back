import { RegisterInfo } from "../domain/user/register-info";
import { User } from "../domain/user/user";

interface UserRepository {
    persist(user: RegisterInfo): Promise<null | User>;
    findByEmail(email: string): Promise<null | User>;
    findById(id: string): Promise<null | User>;
    updateUser(user: User): Promise<null | User>;
}
export default UserRepository;
