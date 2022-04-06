import validateRegister from "./user-register";
import fixtures from "./fixtures/validate-register.fixtures";

describe("Testing of diferents type of Users", () => {
    test.each(fixtures)(
        "Testing some fields from users",
        ({ user, expected }) => {
            const validate = validateRegister(user);
            expect(validate).toBe(expected);
        }
    );
});
