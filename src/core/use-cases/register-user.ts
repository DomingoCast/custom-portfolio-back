import { User } from "../domain/user/User";
import HashFunction from "../ports/hash-function.port";
import UserRepository from "../ports/user-repository.port";

const registerUser = async (
    user: Omit<User, "id">,
    userRepository: UserRepository,
    hashFunction: HashFunction
): Promise<User | null> => {
    const userSafe = {
        ...user,
        password: await hashFunction.hash(user.password),
    };

    return userRepository.persist(userSafe);
};

export default registerUser;
