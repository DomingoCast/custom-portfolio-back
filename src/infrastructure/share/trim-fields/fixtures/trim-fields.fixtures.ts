const fixtures = [
    {
        object: {
            name: "           John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "   123456",
            phone: "+447975777666",
            address: "Kiev, Ukraine",
        },
        expected: {
            name: "John",
            surname: "Dean",
            email: "john@gmail.com",
            password: "   123456",
            phone: "+447975777666",
            address: "Kiev, Ukraine",
        },
    },
    {
        object: {
            name: "John              ",
            password: "      123456    ",
        },
        expected: {
            name: "John",
            password: "      123456    ",
        },
    },
    {
        object: {
            name: "          John              ",
            password: "      123  456    ",
            phone: "   +447975777666",
        },
        expected: {
            name: "John",
            password: "      123  456    ",
            phone: "+447975777666",
        },
    },
    {
        object: {
            color: "          Yellow, Green              ",

            password: "      123, 456    ",
        },
        expected: {
            color: "Yellow, Green",
            password: "      123, 456    ",
        },
    },
    {
        object: {
            carModel: "          c4, c5, c8, c1              ",

            password: "      123456    ",
        },
        expected: {
            carModel: "c4, c5, c8, c1",
            password: "      123456    ",
        },
    },
];
export default fixtures;
