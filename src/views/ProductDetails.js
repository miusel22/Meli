import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from '../redux/actions';
import { BoxSearch } from './BoxSearch';

export const ProductDetails = () => {
  const { id: urlId } = useParams();

  const dispatch = useDispatch();
  console.log(urlId);

 const details = useSelector((state) => state.productDetails);
  console.log({ details })

 const [id, setId] = useState(urlId);

  useEffect(() => {
    setId(urlId);
  }, [urlId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  return (
    <>
    <h1>Hola</h1>
    </>
  );
};