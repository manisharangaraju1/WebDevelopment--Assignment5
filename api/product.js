const { getDatabase, getNextSequence } = require('./db.js');

async function list() {
    const db = getDatabase();
    const products = await db.collection('products').find({}).toArray();
    return products;
  }

  async function add(_, { product }) {
    const db = getDatabase();  
    const newProduct = { ...product };
    newProduct.id = await getNextSequence('products');
    const result = await db.collection('products').insertOne(newProduct);
    const savedProduct = await db.collection('products').findOne({ _id: result.insertedId });
    return savedProduct;
  }


  module.exports = { list, add };