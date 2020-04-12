import React from 'react';
import TextInput from './TextInput';
import NumInput from './NumInput';
import graphQLFetch from './graphQlFetch';

export default class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    const query = `mutation productUpdate($id: Int!, $changes: productUpdateInputs!) {
      productUpdate(id:$id, changes: $changes) {
        id Name Category
        Price Image
      }
    }`;
    const { id, ...changes } = product;
    const data = await graphQLFetch(query, { id, changes });
    if (data) {
      this.setState({ product: data.productUpdate });
      alert('Updated Succesfully!');
    }
    console.log(product); // eslint-disable-line no-console
  }

  async loadData() {
    const query = `query findProduct($id: Int!) {
      findProduct(id: $id) {
      id Name Price
      Category Image
      }
  }`;

    const { match: { params: { id } } } = this.props;
    console.log(id);
    const index = parseInt(id);
    const data = await graphQLFetch(query, { id: index });

    if (data) {
      const { ...product } = data.findProduct;
      console.log(product);
      console.log(data);
      product.Name = product.Name ? product.Name : '';
      product.Price = product.Price ? product.Price.toString() : '';
      product.Image = product.Image ? product.Image : '';
      product.Category = product.Category ? product.Category : 'Shirts';
      this.setState({ product });
    } else {
      this.setState({ product: {} });
    }
  }

  render() {
    const { product: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
    return (
      <div>
        <h2>Edit your Product</h2>
        <form name="ProductEdit">
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  Name
                  <br />
                  <TextInput name="Name" value={this.state.product.Name} onChange={this.onChange} />
                </td>
                <td>
                  Price
                  <br />
                  <NumInput name="Price" value={this.state.product.Price} onChange={this.onChange} />
                </td>
              </tr>
              <tr>
                <td>
                  Category
                  {' '}
                  <br />
                  <select name="category" value={this.state.product.Category} onChange={this.handleChange}>
                    <option value="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Sweaters">Sweaters</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </td>
                <td>
                  Image URL
                  <br />
                  <input type="text" name="image" defaultValue={this.state.product.Image} onChange={this.handleChange}/>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" onClick={this.handleSubmit}>Save Changes</button>
        </form>
      </div>

    );
  }
}
