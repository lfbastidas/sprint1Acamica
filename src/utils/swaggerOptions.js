const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sprint project 1 - Protalento",
            version: "1.0.0",
            description: "Proyecto 1 para acamica DWBE"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            }
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic"
                }
            }
        },
        security: [
            {
                basicAuth: []
            }
        ]
    },
    apis: ["../src/routes/*.js"]
};

module.exports = swaggerOptions;
