import fixtures from "./fixtures/trim-fields.fixtures";
import trimFields from "./trim-fields";

describe("Testing a trimp fields", () => {
    test.each(fixtures)(
        "Testing some fields from object",
        ({ object, expected }) => {
            const field = trimFields(object);
            expect(field).toEqual(expected);
        }
    );
});
