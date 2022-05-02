import fixtures from "./fixtures/validate-register.fixtures";
import trimFields from "../../share/trim-fields/trim-fields";
import validateUserDataForm from "./validate-user";

describe("Testing of diferents type of Users", () => {
    test.each(fixtures)(
        "Testing some fields from users",
        ({ user, expected }) => {
            const validate = validateUserDataForm(<any>user);
            expect(validate).toStrictEqual(expected);
        }
    );
});
describe("Testing a trimp fields", () => {
    test("Testing some fields from users", () => {
        const user = {
            name: "           John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "   123456",
            phone: "+447975777666",
            address: "Kiev, Ukraine",
        };
        const userCorrect = {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "   123456",
            phone: "+447975777666",
            address: "Kiev, Ukraine",
        };
        const field = trimFields(user);
        expect(field).toEqual(userCorrect);
    });
});
