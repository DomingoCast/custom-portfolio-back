import fixtures from "./fixtures/validate-register.fixtures";
import validateUserDataForm from "./validate-user";
import { User } from "../../../core/domain/user/user";

describe("Testing of diferents type of Users", () => {
    test.each(fixtures)(
        "Testing some fields from users",
        ({ user, expected }) => {
            const validate = validateUserDataForm(<User>user);
            expect(validate).toStrictEqual(expected);
        }
    );
});
