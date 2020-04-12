import React from 'react';
import TextInput from './TextInput';
import NumInput from './NumInput';
import graphQLFetch from './graphQlFetch';

export default class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.loadData = this.loadData.bind(this);
    this.state = {
      product: {},
    };

    console.log(this.props);
  }

  componentDidMount() {
    this.loadData();
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
      const { product } = data;
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
    const { issue: { id } } = this.state;
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
                  <TextInput text={this.state.Name} />
                </td>
                <td>
                  Price
                  <br />
                  <NumInput number={this.state.Price} />
                </td>
              </tr>
              <tr>
                <td>
                  Category
                  {' '}
                  <br />
                  <select name="category" value={this.state.Category} onChange={this.handleChange}>
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
                  <input type="text" name="image" defaultValue={this.state.Image} />
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
