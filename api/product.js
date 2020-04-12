const { getDatabase, getNextSequence } = require('./db.js');

async function list() {
    const db = getDatabase();
    const products = await db.collection('products').find({}).toArray();
    return products;
  }

  async function getProduct(_, { id }) {
    console.log(id);
    const db = getDatabase();
    const product = await db.collection('products').findOne({ id: id });
    console.log(product);
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
    console.log('inside remove', id);
    const db = getDatabase();
    result = await db.collection('products').removeOne({ id });
    console.log('After removing');
    return result.deletedCount === 1;
  }

  async function update(_, {id, changes}) {
    const db = getDatabase();
    // if(changes.Name || changes.Price || changes.Category || changes.Image) {
    //   const product = await db.collection('products').findOne({id: id});
    //   Object.assign(product, changes);
    // }
    await db.collection('products').updateOne({ id }, { $set: changes });
    const savedIssue = await db.collection('products').findOne({ id });
    return savedIssue;
  }

  module.exports = { getProduct, list, add, remove, update};