import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from '../redux/actions';
import { BoxSearch } from './BoxSearch';
import { formatPrice } from '../utils';
import _ from 'lodash';
import { Spin } from 'antd';

export const ProductDetails = () => {
  const { id: urlId } = useParams();
  const [load, setLoad] = useState(true);

  const dispatch = useDispatch();
  const { productDetails: details, categories, loading } = useSelector((state) => state);
  const [id, setId] = useState(urlId);

  useEffect(() => {
    if (!loading) {
      setLoad(false);
    }
  }, [loading]);

  useEffect(() => {
    setId(urlId);
  }, [urlId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  const renderCategories = () => { //se obtiene las categorias a las que pertenece el producto buscado.
    if (!categories) return null;

    return categories.map((category, index) => (
      <span key={index} className="category">{category}{index !== categories.length - 1 && ' > '}</span>
    ));
  };
  return (
    <>
      <BoxSearch />
      <div className="categories-container">
        {renderCategories()}
      </div>
      {!load && details ? (
        <div className="product">
          <div className='product-two'>
            <img src={details.picture.replace("-I.jpg", "-O.jpg")} alt={details.title} />
            <div className='product-details'>
              <span>{_.startCase(details.condition)}- {details.sold_quantity} sold</span>
              <span>{details.title}</span>
              <div className='prices'>
                <span>${formatPrice(details.price.amount)}</span>
                <span className='decimal'>{details.price.decimals}0</span>
              </div>
              <a href={details.link} target='_blank'>
                <button>Comprar</button>
              </a>
            </div>
          </div>
          <div className='product-description'>
            <span>Descripción del producto</span>
            {details.description ? (<span>{details.description}</span>) :
            <span>Sin descripción</span>}
          </div>
        </div>
      ) : <Spin />}
    </>
  );
};