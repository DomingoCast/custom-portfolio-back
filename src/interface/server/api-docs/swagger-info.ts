const swaggerInfo = {
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
            description: "Production server",
        },
        {
            url: `http://localhost:8080`,
            description: "Local server",
        },
    ],
};

export default swaggerInfo;
