import { EntitySchema } from "typeorm";
import { User } from "../domain/User";

const UserModel = new EntitySchema<User>({
    name: "User",
    columns: {
        id: {
            type: String,
            primary: true,
            generated: true,
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
            length: 30,
        },
        phone: {
            type: String,
            length: 30,
        },
        address: {
            type: String,
            length: 100,
        },
    },
});

export default UserModel;
