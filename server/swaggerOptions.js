const mongoose = require('mongoose');
const convertModelToSwagger = require('mongoose-to-swagger');
const Admin = require('./models/adminModel');
const ownerModel = require('./models/ownerModel');

const adminSchemaSwaggerDefinition = convertModelToSwagger(Admin);
const ownerSchemaSwaggerDefinition = convertModelToSwagger(ownerModel);

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
        Admin: adminSchemaSwaggerDefinition,
        Owner:ownerSchemaSwaggerDefinition 
      },
    },
  },
  apis: ['./routes/*.js']
};
