import validateRegister from "./validate.register";

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
    it("pass invalid name length < 3", () => {
        const dataForm = {
            name: "Jo",
            surname: "Doe",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe(
            "Invalid name, minimum 3 and maximum 30"
        );
    });
    it("pass invalid name length > 30", () => {
        const dataForm = {
            name: "Joaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            surname: "Doe",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe(
            "Invalid name, minimum 3 and maximum 30"
        );
    });
    it("pass invalid surname length < 3", () => {
        const dataForm = {
            name: "John",
            surname: "An",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe(
            "Invalid surname, minimum 3 and maximum 30"
        );
    });
    it("pass invalid surname length > 30", () => {
        const dataForm = {
            name: "John",
            surname: "Anaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe(
            "Invalid surname, minimum 3 and maximum 30"
        );
    });
    it("pass invalid email not @", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "johngmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe("Invalid email");
    });
    it("pass invalid email not .com", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe("Invalid email");
    });
    it("pass invalid password length < 6", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "1234",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe(
            "Invalid surname, minimum 6 and maximum 30"
        );
    });
    it("pass invalid password length > 30", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "1234121313213124124124214141231",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe(
            "Invalid surname, minimum 6 and maximum 30"
        );
    });
    it("pass invalid phone number length < 9", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "12341213",
            phone: "1234567890",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe(
            "Invalid phone number, minimum 9 and maximum 15"
        );
    });
    it("pass invalid phone number length > 15", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "12341213",
            phone: "1234567890123456",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate[0].message).toBe(
            "Invalid phone number, minimum 9 and maximum 15"
        );
    });
    it("should validate phone number from Spain", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "123456",
            phone: "+34965803035",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate).toBe(true);
    });
    it("should validate phone number from France", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "123456",
            phone: "+33757691744",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate).toBe(true);
    });
    it("should validate phone number from UK", () => {
        const dataForm = {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "123456",
            phone: "+447975777666",
            address: "Kiev, Ukraine",
        };
        const validate = validateRegister(dataForm);
        expect(validate).toBe(true);
    });
});
