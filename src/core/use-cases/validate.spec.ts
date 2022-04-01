const { validateRegister } = require("./validate.register");

describe("Validate fields", () => {
    it("should validate fields", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate).toBe(true);
    });
});
