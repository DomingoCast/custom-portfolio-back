import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({
        length: 255,
    })
    name: string | undefined;

    @Column({
        length: 255,
    })
    surname: string | undefined;

    @Column({
        length: 255,
    })
    @Column({
        length: 255,
    })
    email: string | undefined;

    @Column({
        length: 255,
    })
    password: string | undefined;

    @Column({
        length: 255,
    })
    phone: string | undefined;

    @Column({
        length: 255,
    })
    address: string | undefined;
}
