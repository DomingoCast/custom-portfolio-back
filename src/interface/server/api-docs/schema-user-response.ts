const schemaUserResponseCorrect = {
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
};
export default schemaUserResponseCorrect;
