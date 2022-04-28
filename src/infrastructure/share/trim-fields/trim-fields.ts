import { User } from "../../../core/domain/user/user";

const trimFields = (user: Omit<User, "id">): Omit<User, "id"> => ({
    name: user.name.trim(),
    surname: user.surname.trim(),
    password: user.password,
    email: user.email.trim(),
    phone: user.phone.trim(),
    address: user.address.trim(),
});

export default trimFields;
