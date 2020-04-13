import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
export default function ProductRow(props) {
  const { product } = props;
  const { deleteProduct } = props;
  return (
    <tr>
      <td>{product.Name}</td>
      <td>
        $
        {product.Price}
      </td>
      <td>{product.Category}</td>

      <td><Link to={`/image/${product.image}`}> View </Link></td>
      <td>
        <Link to={{ pathname: `/edit/${product.id}`}}>Edit</Link>
      </td>
      <td>
        <button type="button" onClick={() => { deleteProduct(product.id); }}>Delete Product</button>
      </td>
    </tr>
  );
}
