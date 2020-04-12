import React from 'react';
import ProductTable from './ProductTable';
import ProductAdd from './ProductAdd';
import graphQLFetch from './graphQlFetch';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }
  // const data = await graphQLFetch(query, { id });

  async loadData() {
    const query = `query {
            productList {
            id Name Category Price Image
            }
        }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ products: data.productList });
    }
  }

  async createProduct(newProduct) {
    const query = `mutation productAdd($newProduct: productInput!) {
            productAdd(product: $newProduct) {
            id
            }
        }`;
    await graphQLFetch(query, { newProduct });
    this.loadData();
  }

  async deleteProduct(index) {
    console.log(index);
    console.log(typeof index);
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
      }`;
    const data = await graphQLFetch(query, { id: index });
    console.log(data);
    if (data && data.productDelete) {
      this.loadData();
    }
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const allProducts = this.state.products;
    return (
      <div>
        <h1>My Company MyInventory</h1>
        Showing all available products
        <hr />
        <ProductTable products={allProducts} deleteProduct={this.deleteProduct} />
        <hr />
        Add a new product to inventory
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </div>
    );
  }
}
