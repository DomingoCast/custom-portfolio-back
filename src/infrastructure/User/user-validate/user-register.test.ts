import fixtures from "./fixtures/validate-register.fixtures";
import validateUserDataForm from "./validate-user-data-form";

describe("Testing of diferents type of Users", () => {
    test.each(fixtures)(
        "Testing some fields from users",
        ({ user, expected }) => {
            const validate = validateUserDataForm(user);
            expect(validate).toBe(expected);
        }
    );
});
