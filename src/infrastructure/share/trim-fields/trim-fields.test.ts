import fixtures from "./fixtures/trim-fields.fixtures";
import trimFields from "./trim-fields";
import arrayExceptions from "./array-exceptions";

describe("Testing a trimp fields", () => {
    test.each(fixtures)("Test: $description", ({ object, expected }) => {
        expect(trimFields(<any>object, arrayExceptions)).toEqual(expected);
    });
});
