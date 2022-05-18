const swaggerInfo = {
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
            url: `http://jntco-loadb-h3mmmgwqamex-88cd2b11d447a160.elb.us-east-1.amazonaws.com:8080`,
            description: "Production server",
        },
        {
            url: `http://localhost:8080`,
            description: "Local server",
        },
    ],
    apis: ["../app.ts"],
};

export default swaggerInfo;
