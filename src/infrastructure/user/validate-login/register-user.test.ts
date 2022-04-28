import fixtures from "./fixtures/validate-login.fixtures";
import validateUserDataForm from "./validate-user-data-form";

describe("Testing of diferents type of logins", () => {
    test.each(fixtures)("Test login options", ({ user, expected }) => {
        const validate = validateUserDataForm(user);
        expect(validate).toBe(expected);
    });
});
