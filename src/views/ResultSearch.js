import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';
import { BoxSearch } from './BoxSearch';
import Shipping from '../img/shipping.png'

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
            <BoxSearch />
            {products && (
                products.map(item => (
                    <Link to={`/items/${item.id}/description`}>
                        <div
                            className="card-product"
                        >
                            <img src={item.picture.replace("-I.jpg", "-O.jpg")} alt={item.title} style={{ maxWidth: '180px', height: 'auto' }} />
                            <div className="description">
                                <div className='price'>
                                    <span>${item.price.amount}</span>
                                    {item.free_shipping && (
                                        <img src={Shipping} />
                                    )}
                                </div>
                                <span>{item.title}</span>
                            </div>
                        </div>
                    </Link>

                ))

            )}


        </>
    );
};