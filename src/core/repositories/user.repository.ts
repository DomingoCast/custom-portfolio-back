import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
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
