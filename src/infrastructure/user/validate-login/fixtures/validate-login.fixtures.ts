const fixtures = [
    {
        login: {
            email: "john@gmail.com",
            password: "123456",
        },
        expected: true,
    },
    {
        login: {
            email: "john@gmail",
            password: "123456",
        },
        expected: "Invalid email",
    },
    {
        login: {
            email: "john@gmail.com",
            password: "122",
        },
        expected: "Invalid password, minimum 6 and maximum 30",
    },
    {
        login: {
            email: "john@gmail.com",
            password: "121321231223912239218482482183818248218284813",
        },
        expected: "Invalid password, minimum 6 and maximum 30",
    },
];
export default fixtures;
