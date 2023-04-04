const mongoose = require('mongoose');
const convertModelToSwagger = require('mongoose-to-swagger');
const Admin = require('./models/adminModel');
const HomeOwner = require('./models/ownerModel');
const Tenant = require('./models/tenantModel');
const Comment = require('./models/commentModel');
const House = require('./models/homeModel');
const adminSchemaSwaggerDefinition = convertModelToSwagger(Admin);
 const homeOwnerSchemaSwaggerDefinition = convertModelToSwagger(HomeOwner);
const tenantSchemaSwaggerDefinition = convertModelToSwagger(Tenant);
const commentSchemaSwaggerDefinition = convertModelToSwagger(Comment);
const houseSchemaSwaggerDefinition = convertModelToSwagger(House);

const imageSchemaSwaggerDefinition = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      url: {
        type: 'string'
      },
      description: {
        type: 'string'
      }
    }
  }
};

module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Rest API',
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
         HomeOwner: homeOwnerSchemaSwaggerDefinition,
        Tenant: tenantSchemaSwaggerDefinition,
        Comment: commentSchemaSwaggerDefinition,
        House: houseSchemaSwaggerDefinition 
        
      }
    }
  },
  apis: ['./routes/*.js']
};
 