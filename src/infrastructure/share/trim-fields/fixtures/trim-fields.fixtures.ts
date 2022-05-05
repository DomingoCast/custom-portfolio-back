const fixtures = [
    {
        description: "Quit whitespace into a object except password",
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
        description:
            "Pass Object quit whitespace into a string except password",
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
        description:
            "Pass Object quit whitespace into a string except password",

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
        description:
            "Pass Object with colors and quit whitespace into a string except password",
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
        description:
            "Pass Object with carModel and quit whitespace except password",
        object: {
            carModel: "          c4, c5, c8, c1              ",

            password: "      123456    ",
        },
        expected: {
            carModel: "c4, c5, c8, c1",
            password: "      123456    ",
        },
    },
    {
        description:
            "Pass Object with thousand separator special spaces and quit whitespace",
        object: {
            separator: "  4 294 967 295,000 000  ",
        },
        expected: {
            separator: "4 294 967 295,000 000",
        },
    },
];
export default fixtures;
