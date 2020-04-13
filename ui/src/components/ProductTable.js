import React from 'react';
import ProductRow from './ProductRow';

export default function ProductTable(props) {
  const { products } = props;
  const deleteProduct = props.deleteProduct;
  const productRows = products.map(
    product => <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} />,
  );
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Edit Product</th>
          <th>Delete Product</th>
        </tr>
      </thead>
      <tbody>{ productRows }</tbody>
    </table>
  );
}
