import swaggerJsdoc from "swagger-jsdoc";
import schemaLoginUserParameters from "./schemas/schema-login-user-parameters";
import schemaRegisterUserParameters from "./schemas/schema-register-user-parameters";
import swaggerInfo from "./swagger-info";

const swaggerOptions: swaggerJsdoc.Options = {
    openapi: swaggerInfo.openapi,
    info: swaggerInfo.info,
    servers: swaggerInfo.servers,
    apis: swaggerInfo.apis,
    paths: {
        "/register": {
            post: {
                url: "Development server",
                tags: ["Register"],
                description: "Return a response of a new user.",
                requestBody: {
                    content: {
                        "application/x-www-form-urlencoded": {
                            schema: schemaRegisterUserParameters.schema,
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Response of new user.",
                        content: {
                            "application/json": {
                                schema: schemaRegisterUserParameters
                                    .correctSchema.schema,
                            },
                        },
                    },
                    400: {
                        description: "Error: Bad Request",
                        content: {
                            "application/json": {
                                schema: schemaRegisterUserParameters
                                    .incorrectSchema.schema,
                            },
                        },
                    },
                    409: {
                        description: "Error: Conflict",
                        content: {
                            "application/json": {
                                schema: schemaRegisterUserParameters
                                    .incorrectSchema.schema,
                            },
                        },
                    },
                },
            },
        },
        "/login": {
            post: {
                url: "Development server",
                tags: ["Login"],
                description: "Return a response of a new user.",
                requestBody: {
                    content: {
                        "application/x-www-form-urlencoded": {
                            schema: schemaLoginUserParameters.schema,
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Response of new user.",
                        content: {
                            "application/json": {
                                schema: schemaLoginUserParameters.correctSchema
                                    .schema,
                            },
                        },
                    },
                    400: {
                        description: "Error: Bad Request",
                        content: {
                            "application/json": {
                                schema: schemaLoginUserParameters
                                    .incorrectSchema.schema,
                            },
                        },
                    },
                    403: {
                        description: "Error: Forbidden",
                        content: {
                            "application/json": {
                                schema: schemaLoginUserParameters
                                    .forbiddenSchema.schema,
                            },
                        },
                    },
                },
            },
        },
    },
};
export default swaggerOptions;
