import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
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
};
export default swaggerJsdoc(swaggerOptions);
