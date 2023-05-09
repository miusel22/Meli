import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from '../redux/actions';
import { BoxSearch } from './BoxSearch';
import { formatPrice } from '../utils';
import _ from 'lodash';

export const ProductDetails = () => {
  const { id: urlId } = useParams();

  const dispatch = useDispatch();
  const { productDetails: details, categories } = useSelector((state) => state);
  const [id, setId] = useState(urlId);

  useEffect(() => {
    setId(urlId);
  }, [urlId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  const renderCategories = () => {
    if (!categories) return null;

    return categories.map((category, index) => (
      <span key={index} className="category">{category}{index !== categories.length - 1 && ' > '}</span>
    ));
  };

  return (
    <>
      <BoxSearch showHome={false} />
      <div className="categories-container">
        {renderCategories()}
      </div>
      {details ? (
        <div className="product">
          <div className='product-two'>
            <img src={details.picture.replace("-I.jpg", "-O.jpg")} alt={details.title} style={{ maxWidth: '668px' }} />
            <div className='product-details'>
              <span>{_.startCase(details.condition)}- {details.sold_quantity} sold</span>
              <span>{details.title}</span>
              <span>${formatPrice(details.price.amount)}</span>
              <button>Comprar</button>
            </div>
          </div>
          <div className='product-description'>
            <span>Descripción del producto</span>
            <span>{details.description}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};