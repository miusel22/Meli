import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';
import { BoxSearch } from './BoxSearch';

export const ResultSearch = () => {
  const { search: urlSearch } = useParams();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  console.log({ products })

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    if (search) {
      dispatch(fetchProducts(search));
    }
  }, [dispatch, search]);

  return (
    <>
     <BoxSearch/>
    </>
  );
};