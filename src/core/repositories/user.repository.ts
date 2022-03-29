import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
    name: "User",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
            length: 100,
            nullable: false,
        },
        surname: {
            type: String,
            length: 100,
            nullable: false,
        },
        email: {
            type: String,
            length: 100,
            nullable: false,
        },
        password: {
            type: String,
            length: 100,
            nullable: false,
        },
        phone: {
            type: String,
            length: 100,
            nullable: false,
        },
        address: {
            type: String,
            length: 100,
            nullable: false,
        },
    },
});
