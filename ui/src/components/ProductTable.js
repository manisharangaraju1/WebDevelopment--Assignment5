import React from 'react';
import ProductRow from './ProductRow';

export default function ProductTable(props) {
  const { products } = props;
  const productRows = products.map(
    product => <ProductRow key={product.id} product={product} />,
  );
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>{ productRows }</tbody>
    </table>
  );
}
