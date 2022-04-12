import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    openapi: "3.0.1",
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
    apis: ["./app.ts"],
    paths: {
        "/": {
            namespace: "Home",
            get: {
                summary:
                    "This endpoint is to prove that this endpoint works well.",
                tags: ["Home"],
                responses: {
                    200: {
                        description: "Response Hello World.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Hello world!",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/register": {
            post: {
                tags: ["Register"],
                description: "Return a response of a new user.",
                requestBody: {
                    content: {
                        "application/x-www-form-urlencoded": {
                            // application/x-www-form-urlencoded
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
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Response of new user.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                    // type: "object",
                                    // properties: {
                                    //     message: {
                                    //         type: "string",
                                    //         example: {
                                    //             name: "John",
                                    //             surname: "Doe",
                                    //         },
                                    //     },
                                    // },
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
