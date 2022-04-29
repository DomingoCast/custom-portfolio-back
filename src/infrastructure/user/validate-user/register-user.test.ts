import fixtures from "./fixtures/validate-register.fixtures";
import validateUserDataForm from "./validate-user-data-form";
import trimFields from "../../share/trim-fields/trim-fields";

describe("Testing of diferents type of Users", () => {
    test.each(fixtures)(
        "Testing some fields from users",
        ({ user, expected }) => {
            const validate = validateUserDataForm(user);
            expect(validate).toBe(expected);
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
