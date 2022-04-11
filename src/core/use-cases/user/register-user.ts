import { User } from "../../domain/user/User";

const registerUser =
    ({ userRepository }: any) =>
    (user: Omit<User, "id">): Promise<User | null> => {
        return userRepository.persist(user);
    };

export default registerUser;
