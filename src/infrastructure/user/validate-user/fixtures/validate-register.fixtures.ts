const fixtures = [
    {
        user: {
            name: "John",
            surname: "Doe",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: true,
    },
    {
        user: {
            name: "Jo",
            surname: "Doe",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid name, minimum 3 and maximum 30",
    },
    {
        user: {
            name: "Johnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
            surname: "Den",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid name, minimum 3 and maximum 30",
    },
    {
        user: {
            name: "John",
            surname: "Dn",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid surname, minimum 3 and maximum 30",
    },
    {
        user: {
            name: "John",
            surname: "Johnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
            email: "john@gmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid surname, minimum 3 and maximum 30",
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "johngmail.com",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid email",
        fixtures_title: "User with valid data",
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "john@gmail",
            password: "123456",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid email",
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "122",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid password, minimum 6 and maximum 30",
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "121321231223912239218482482183818248218284813",
            phone: "+380991234567",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid password, minimum 6 and maximum 30",
        fixtures_title: "User with valid data",
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "123456",
            phone: "1234567890",
            address: "Kiev, Ukraine",
        },
        expected: "Invalid phone number, minimum 9 and maximum 15",
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "123456",
            phone: "123456789033333",
            address: "Kiev, Ukraine",
        },
        expected: true,
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "123456",
            phone: "+34965803035",
            address: "Kiev, Ukraine",
        },
        expected: true,
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "123456",
            phone: "+33757691744",
            address: "Kiev, Ukraine",
        },
        expected: true,
    },
    {
        user: {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "123456",
            phone: "+447975777666",
            address: "Kiev, Ukraine",
        },
        expected: true,
    },
];
export default fixtures;
