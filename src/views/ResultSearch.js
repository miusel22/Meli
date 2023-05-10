import React from 'react';
import { useParams } from 'react-router-dom';
import { BoxSearch } from './BoxSearch';
import { Products } from '../components/Products';

export const ResultSearch = () => {
  const { search: urlSearch } = useParams();
  return (
    <>
      <BoxSearch/>
      {urlSearch && <Products search={urlSearch} />}
    </>
  );
};
