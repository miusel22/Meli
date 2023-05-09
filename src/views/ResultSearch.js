import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';
import { BoxSearch } from './BoxSearch';
import Shipping from '../img/shipping.png';
import { formatPrice } from '../utils';
import _ from 'lodash';
export const ResultSearch = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { search: urlSearch } = useParams();

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
    console.log({ products, categories })
    console.log("hi");

    /* const productsPerPage = 4;
     const indexOfLastProduct = currentPage * productsPerPage;
     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
     const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);*/
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

            {/*<Pagination
                current={currentPage}
                pageSize={productsPerPage}
                total={products.length}
                onChange={setCurrentPage}
            />*/}

        </>
    );
};