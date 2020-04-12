import React from 'react';

export default function ProductImage({ match }) {
  const { url } = match.params;
  return (
    <img src={url} alt="Icon" />
  );
}
