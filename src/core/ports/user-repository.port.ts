import { RegisterInfo } from "../domain/user/register-info";
import { User } from "../domain/user/user";

interface UserRepository {
    persist(user: RegisterInfo): Promise<null | User>;
}
export default UserRepository;
