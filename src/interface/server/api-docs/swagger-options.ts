const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Documentation API of academy DHA.",
            description:
                "This API has the function at this moment to add a new user from a registration form.",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http:/http://ec2-3-85-237-21.compute-1.amazonaws.com/`,
                description: "Development server",
            },
            {
                url: `http://localhost:8080`,
                description: "Local server",
            },
        ],
    },
    apis: ["../app.ts"],
    tags: [
        {
            name: "/",
            description:
                "This endpoint is to prove that this endpoint works well.",
        },
        {
            name: "/register",
            description: "This endpoint is to valid and register new User.",
        },
    ],
    paths: {
        "/": {
            get: {
                tags: ["Home"],
                summary: "Home page",
                description: "This is the home page of the API",
                responses: {
                    200: {
                        description: "Successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            description: "Hello World!",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
export default swaggerOptions;
