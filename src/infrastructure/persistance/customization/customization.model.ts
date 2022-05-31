import { EntitySchema } from "typeorm";
import { Customization } from "../../../core/domain/customization/customization";

const CustomizationModel = new EntitySchema<Customization>({
    name: "Customization",
    columns: {
        id: {
            primary: true,
            generated: "uuid",
            type: String,
        },
        fontFamily: {
            type: String,
            length: 30,
        },
        fontColor: {
            type: String,
            length: 30,
        },
        primaryColour: {
            type: String,
            length: 30,
        },
        secondaryColour: {
            type: String,
            length: 30,
        },
        gridStyle: {
            type: String,
            length: 30,
        },
    },
    relations: {
        user: {
            type: "one-to-one",
            target: "User",
            joinColumn: true,
        },
    },
});

export default CustomizationModel;
