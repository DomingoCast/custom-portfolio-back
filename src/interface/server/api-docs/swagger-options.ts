import swaggerJsdoc from "swagger-jsdoc";
import schemaUserParametersProperties from "./schemas/schema-user-register-parameters";
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
                            schema: schemaUserParametersProperties.schema,
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Response of new user.",
                        content: {
                            "application/json": {
                                schema: schemaUserParametersProperties
                                    .correctSchema.schema,
                            },
                        },
                    },
                    400: {
                        description: "Error: Bad Request",
                        content: {
                            "application/json": {
                                schema: schemaUserParametersProperties
                                    .incorrectSchema.schema,
                            },
                        },
                    },
                    409: {
                        description: "Error: Conflict",
                        content: {
                            "application/json": {
                                schema: schemaUserParametersProperties
                                    .incorrectSchema.schema,
                            },
                        },
                    },
                },
            },
        },
    },
};
export default swaggerOptions;
