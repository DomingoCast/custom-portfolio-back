import swaggerJsdoc from "swagger-jsdoc";
import schemaUserParametersProperties from "./schemas/schema-user-parameters";
import schemaUserResponseCorrect from "./schemas/schema-user-response-correct";
import schemaUserResponseIncorrect from "./schemas/schema-user-response-incorrect";
import schemaHomeResponseCorrect from "./schemas/schema-home-response-correct";
import swaggerInfo from "./swagger-info";

const swaggerOptions: swaggerJsdoc.Options = {
    openapi: "3.0.1",
    info: swaggerInfo.info,
    servers: swaggerInfo.servers,
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
                                schema: schemaHomeResponseCorrect.schema,
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
                            schema: schemaUserParametersProperties.schema,
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Response of new user.",
                        content: {
                            "application/json": {
                                schema: schemaUserResponseCorrect.schema,
                            },
                        },
                    },
                    400: {
                        description: "Error: Bad Request",
                        content: {
                            "application/json": {
                                schema: schemaUserResponseIncorrect.schema,
                            },
                        },
                    },
                    409: {
                        description: "Error: Conflict",
                        content: {
                            "application/json": {
                                schema: schemaUserResponseIncorrect.schema,
                            },
                        },
                    },
                },
            },
        },
    },
};
export default swaggerOptions;
