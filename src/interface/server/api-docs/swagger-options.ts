import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    openapi: "3.0.1",
    info: {
        title: "Documentation API of academy DHA.",
        description:
            "This API has the function at this moment to add a new user from a registration form.",
        version: "1.0.0",
        license: {
            name: "License by Job And Talent",
            url: "https://www.jobandtalent.com/es",
        },
        contact: {
            name: "Job And Talent Villena",
            url: "https://www.jobandtalent.com/es",
        },
    },
    servers: [
        {
            url: `http://ec2-3-85-237-21.compute-1.amazonaws.com`,
            description: "Development server",
        },
        {
            url: `http://localhost:8080`,
            description: "Local server",
        },
    ],
    apis: ["../app.ts"],
    paths: {
        "/": {
            namespace: "Home",
            get: {
                url: "Development server",
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
                url: "Development server",
                tags: ["Register"],
                description: "Return a response of a new user.",
                requestBody: {
                    content: {
                        "application/x-www-form-urlencoded": {
                            // application/x-www-form-urlencoded
                            schema: {
                                // $ref: "./create-user-interface.yaml#/User",
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
                                    // $ref: "../../../infrastructure/user/user-validate/interface/create-user-data-form-interface.ts",
                                    type: "object",
                                    properties: {
                                        message: {
                                            success: {
                                                type: "object",
                                                example: true,
                                                code: 200,
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
    },
};
export default swaggerOptions;
