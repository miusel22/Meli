import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BoxSearch } from './BoxSearch';
import _ from 'lodash';
import { Products } from '../components/Products';
export const ResultSearch = () => {

    const { search: urlSearch } = useParams();
    const [search, setSearch] = useState(urlSearch);

    useEffect(() => {
        setSearch(urlSearch);
    }, [urlSearch]);

    return (
        <>
            <BoxSearch />
            {search && (
                <Products search={search} />
            )}
        </>
    );
};