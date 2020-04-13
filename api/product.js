const { getDatabase, getNextSequence } = require('./db.js');

async function list() {
    const db = getDatabase();
    const products = await db.collection('products').find({}).toArray();
    return products;
  }

  async function getProduct(_, { id }) {
    const db = getDatabase();
    const product = await db.collection('products').findOne({ id: id });
    return product;
  }

  async function add(_, { product }) {
    const db = getDatabase();  
    const newProduct = { ...product };
    newProduct.id = await getNextSequence('products');
    const result = await db.collection('products').insertOne(newProduct);
    const savedProduct = await db.collection('products').findOne({ _id: result.insertedId });
    return savedProduct;
  }

  async function remove(_, { id }) {
    const db = getDatabase();
    result = await db.collection('products').removeOne({ id });
    return result.deletedCount === 1;
  }

  async function update(_, {id, changes}) {
    const db = getDatabase();
    await db.collection('products').updateOne({ id }, { $set: changes });
    const savedIssue = await db.collection('products').findOne({ id });
    return savedIssue;
  }

  module.exports = { getProduct, list, add, remove, update};