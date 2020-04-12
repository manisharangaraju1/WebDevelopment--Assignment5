const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const product = require('./product.js');

const resolvers = {
    Query: {
      productList: product.list,
      findProduct: product.getProduct,
    },
    Mutation: {
      productAdd: product.add,
      productDelete: product.remove,
      productUpdate: product.update
    },
  };

const server = new ApolloServer({
typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
resolvers,
});

function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };