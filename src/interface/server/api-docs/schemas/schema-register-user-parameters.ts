const schemaRegisterUserParameters = {
    schema: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Name of new user.",
                example: "John",
            },
            surname: {
                type: "string",
                description: "Surname of new user.",
                example: "Doe",
            },
            email: {
                type: "string",
                description: "Email of new user.",
                example: "john@gmail.com",
            },
            password: {
                type: "string",
                description: "Password of new user.",
                example: "12345678",
            },
            phone: {
                type: "string",
                description: "Phone of new user.",
                example: "+380991234567",
            },
            address: {
                type: "string",
                description: "Address of new user.",
                example: "Ukraine, Kyiv",
            },
        },
    },
    correctSchema: {
        schema: {
            type: "object",
            properties: {
                message: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                        },
                        surname: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                        },
                        phone: {
                            type: "string",
                        },
                        address: {
                            type: "string",
                        },
                        id: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },
    incorrectSchema: {
        schema: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                },
            },
        },
    },
};
export default schemaRegisterUserParameters;
