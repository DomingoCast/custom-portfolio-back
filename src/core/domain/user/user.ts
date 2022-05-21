import { Role } from "./role.enum";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: Role;
    collections?: string;
}
