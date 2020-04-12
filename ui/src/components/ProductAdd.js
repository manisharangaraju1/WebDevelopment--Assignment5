import React from 'react';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('in here');
    const form = document.forms.addProduct;
    const { createProduct } = this.props;
    createProduct({
      Name: form.name.value,
      Price: parseFloat(form.price.value.slice(1)),
      Category: form.category.value,
      Image: form.image.value,

    });
    form.name.value = '';
    form.category.value = '';
    form.price.value = form.price.defaultValue;
    form.image.value = '';
  }

  render() {
    return (
      <div>
        <form name="addProduct">
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  Name
                  <br />
                  <input type="text" name="name" placeholder="Name" />
                </td>
                <td>
                  Price
                  <br />
                  <input type="text" name="price" defaultValue="$" />
                </td>
              </tr>
              <tr>
                <td>
                  Category
                  {' '}
                  <br />
                  <select name="category">
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
                  <input type="text" name="image" placeholder="Image" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" onClick={this.handleSubmit}>Add Product</button>
        </form>
      </div>
    );
  }
}
