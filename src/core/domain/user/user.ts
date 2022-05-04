import { EnumType } from "typescript";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: Role;
}
