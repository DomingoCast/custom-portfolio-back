import fixtures from "./fixtures/validate-login.fixtures";
import validateLogin from "./validate-login";

describe("Testing of diferents type of logins", () => {
    test.each(fixtures)("Test login options", ({ login, expected }) => {
        const validate = validateLogin(login!);
        expect(validate).toStrictEqual(expected);
    });
});
