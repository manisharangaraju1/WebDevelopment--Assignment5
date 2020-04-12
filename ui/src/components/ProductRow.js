import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
export default function ProductRow(props) {
  console.log('product row', props);
  const { product } = props;
  const { deleteProduct } = props;
  console.log(deleteProduct);
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
        {/* <a href={`/#/edit/${product}`}> Edit </a> */}
      </td>
      <td>
        <button type="button" onClick={() => { deleteProduct(product.id); }}>Delete Product</button>
      </td>
    </tr>
  );
}
