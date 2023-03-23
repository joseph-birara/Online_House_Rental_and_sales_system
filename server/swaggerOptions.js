module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: ' Rest API',
      version: '1.0.0',
      description: 'All APIs of online home rental and sales system'
    },
    servers: [
      {
        url: 'http://localhost:4000'
      }
    ],
    components: {
      schemas: {
        Admin: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
          required: ["name", "email", "password"],
        },
      },
    },
  },
  apis: ['./routes/*.js']
};
