import { User } from "../user/user";

export interface Customization {
    id: string;
    user: User;
    fontFamily?: string;
    fontColor?: string;
    primaryColour?: string;
    secondaryColour?: string;
    gridStyle?: string;
}
