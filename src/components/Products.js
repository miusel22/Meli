import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';
import _ from 'lodash';
import Shipping from '../img/shipping.png';
export const Products = ({ search }) => {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
    const [toSearch, setToSearch] = useState("");
    console.log({categories});

    useEffect(() => {
        if (search) {
            setToSearch(search);
        } else {
            setToSearch("cuidado facial");
        }
    }, [search]);

    useEffect(() => {
        if (toSearch) {
            dispatch(fetchProducts(toSearch));

        }
    }, [dispatch, toSearch]);


    return (
        <>
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
                                <img src={item.picture.replace("-I.jpg", "-O.jpg")} alt={item.title} style={{ maxWidth: '180px', height: '180px' }} />
                                <div className="detail">
                                    <div className='price'>
                                        <span>${formatPrice(item.price.amount)}</span>
                                        {item.free_shipping && (
                                            <img src={Shipping} />
                                        )}
                                    </div>
                                    <div className='description'>
                                        <span>{item.country}</span>
                                        <span className='title'>{item.title}</span>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    ))

                )}
            </div>
        </>
    );
};