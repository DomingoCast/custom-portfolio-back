import fixtures from "./fixtures/validate-password.fixtures";
import validatePassword from "./validate-password";

describe("Testing of diferents type of logins", () => {
    test.each(fixtures)("Test password options", ({ password, expected }) => {
        const validate = validatePassword(password!);
        expect(validate).toStrictEqual(expected);
    });
});
