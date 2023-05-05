
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';

const { Search } = Input;

export const BoxSearch = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts(search));
    }, [dispatch, search]);
    console.log({ products })
    return (
        <>
            <header>
                <Search placeholder="Nunca dejes de buscar" onSearch={(v) => {
                    setSearch(v)
                }} enterButton />
            </header>

        </>
    );
}