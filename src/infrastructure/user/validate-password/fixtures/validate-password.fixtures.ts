const fixtures = [
    {
        password: {
            password: "123456",
        },
        expected: true,
    },
    {
        password: {
            password: "122",
        },
        expected: ["Invalid password, minimum 6 and maximum 30"],
    },
];
export default fixtures;
