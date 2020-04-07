import React from 'react';

export default class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleOnClick(url) {
    window.open(url, '_blank');
  }

  render() {
    const linkStyle = { textDecoration: 'underline', color: 'blue' };
    const { product } = this.props;
    return (
      <tr>
        <td>{product.Name}</td>
        <td>
          $
          {product.Price}
        </td>
        <td>{product.Category}</td>
        <td>
          <div
            role="button"
            style={linkStyle}
            tabIndex={0}
            onClick={() => { this.handleOnClick(product.image); }}
            onKeyDown={() => { this.handleOnClick(product.image); }}
          >
            {' '}
            View
          </div>
        </td>
      </tr>
    );
  }
}
