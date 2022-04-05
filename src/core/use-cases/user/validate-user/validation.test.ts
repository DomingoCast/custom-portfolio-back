import validateRegister from "./validate-register";
import fixtures from "./fixtures/validate-register.fixtures";

describe("Testing of diferents type of Users", () => {
    test.each(fixtures)(
        "Testing some fields from users",
        ({ user, expected }) => {
            const validate = validateRegister(user);
            if (validate !== true) {
                return expect(validate[0].message).toBe(expected);
            }
            expect(validate).toBe(expected);
        }
    );
});
