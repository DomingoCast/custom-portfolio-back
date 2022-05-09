import { Role } from "../../core/domain/user/role.enum";
import { User } from "../../core/domain/user/user";
import { container } from "../dependency-injection/awilix-set-up";

const runSeed = async (): Promise<void> => {
    const admin: Omit<User, "id"> = {
        name: process.env.ADMIN_NAME!,
        password: process.env.ADMIN_PASSWORD!,
        surname: process.env.ADMIN_SURNAME!,
        email: process.env.ADMIN_EMAIL!,
        phone: process.env.ADMIN_PHONE!,
        address: process.env.ADMIN_ADRESS!,
        role: Role.admin,
    };

    if (
        !(await container.cradle.userRepository.findByEmail(
            process.env.ADMIN_EMAIL!
        ))
    )
        container.cradle.userRepository.persist(admin);
};

export default runSeed;
