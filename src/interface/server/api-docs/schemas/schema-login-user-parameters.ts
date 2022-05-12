const schemaLoginUserParameters = {
    schema: {
        type: "object",
        properties: {
            email: {
                type: "string",
                description: "Email of existing user.",
                example: "john@gmail.com",
            },
            password: {
                type: "string",
                description: "Password of existing user.",
                example: "12345678",
            },
        },
    },
    correctSchema: {
        schema: {
            type: "object",
            properties: {
                token: {
                    type: "string",
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
export default schemaLoginUserParameters;
