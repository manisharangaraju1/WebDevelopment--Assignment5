import React from 'react';
import ProductTable from './ProductTable';
import ProductAdd from './ProductAdd';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
            productList {
            id Name Category Price Image
            }
        }`;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    if (result.data) {
      this.setState({ products: result.data.productList });
    }
  }

  async createProduct(newProduct) {
    const query = `mutation productAdd($newProduct: productInput!) {
            productAdd(product: $newProduct) {
            id
            }
        }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { newProduct } }),
    });
    this.loadData();
  }

  render() {
    const allProducts = this.state.products;
    return (
      <div>
        <h1>My Company MyInventory</h1>
        Showing all available products
        <hr />
        <ProductTable products={allProducts} />
        <hr />
        Add a new product to inventory
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </div>
    );
  }
}
