import { EntitySchema } from "typeorm";
import { User } from "../../../core/domain/user/user";

const UserModel = new EntitySchema<User>({
    name: "User",
    columns: {
        id: {
            primary: true,
            generated: "uuid",
            type: String,
        },
        name: {
            type: String,
            length: 30,
        },
        surname: {
            type: String,
            length: 30,
        },
        email: {
            type: String,
            length: 100,
            unique: true,
        },
        password: {
            type: String,
            length: 100,
        },
        phone: {
            type: String,
            length: 30,
        },
        address: {
            type: String,
            length: 100,
        },
        role: {
            type: String,
            length: 100,
        },
    },
});

export default UserModel;
