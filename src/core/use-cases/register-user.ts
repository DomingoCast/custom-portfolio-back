import createHashFunction from "../../infrastructure/password/create-hash-function";
import { User } from "../domain/user/user";
import UserRepository from "../ports/user-repository.port";

const registerUser = async (
    user: Omit<User, "id">,
    userRepository: UserRepository
): Promise<User | null> => {
    const hashFunction = createHashFunction();
    const userSafe = {
        ...user,
        password: await hashFunction.hash(user.password),
    };

    return userRepository.persist(userSafe);
};

export default registerUser;
