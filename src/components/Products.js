import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';
import _ from 'lodash';
import Shipping from '../img/shipping.png';
import { Spin } from 'antd';

export const Products = ({ search }) => {
    const [load, setLoad] = useState(true);
    const dispatch = useDispatch();
    const { products, categories, loading } = useSelector((state) => state);
    const [toSearch, setToSearch] = useState("");

    useEffect(() => {
        if (search) {
            setToSearch(search);
        } else {
            setToSearch("maquillaje"); // este componente se visualiza en el <Home/> con productos para el
        }                              // día de la madre si el usuario no ha buscado algún producto.
    }, [search]);

    useEffect(() => {
        if (!loading) {
            setLoad(false);
        }

    }, [loading]);

    useEffect(() => {
        if (toSearch) {
            dispatch(fetchProducts(toSearch));

        }
    }, [dispatch, toSearch]);


    return (
        <>{!load ? (<>
            <div className="categories-container">
                {categories && (categories.map((category, index) => (
                    <span key={index} className="category">{category}{index !== categories.length - 1 && ' > '}</span>
                )))}
            </div>
            <div className='all-products'>
                {products && (
                    products.map(item => (
                        <Link to={`/items/${item.id}/description`}>
                            <div
                                className="card-product"
                            >
                                <img className="img-product" src={item.picture.replace("-I.jpg", "-O.jpg")} alt={item.title} style={{ width: '180px', height: '180px' }} />
                                <div className="detail">
                                    <div className='price'>
                                        <span>${formatPrice(item.price.amount)}</span>
                                        {item.free_shipping && (
                                            <img src={Shipping} alt="shipping"/>
                                        )}
                                    </div>
                                    <div className='description'>
                                        <span>{item.country}</span>
                                        <span style={{ maxWidth: '390px' }} className='title'>{item.title}</span>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    ))

                )}
            </div>
        </>) : <Spin />}

        </>
    );
};