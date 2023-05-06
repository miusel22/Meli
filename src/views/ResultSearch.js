import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';
import { BoxSearch } from './BoxSearch';
import { List, Card, Rate, Divider } from 'antd';

export const ResultSearch = () => {
    const { search: urlSearch } = useParams();

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);
    console.log({products})

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
            {products &&(
                <List
                locale={{ emptyText: 'No ratings' }}
                grid={{ gutter: 8, column: 1 }}
                dataSource={products}
                renderItem={(item) => (
                    <List.Item>
                    <Link to={`/items/${item.id}/description`}>
                        <Card
                            className="centered-card"
                            cover={<img src={item.picture} />}
                            title={item.id}
                            bordered={false}
                            style={{ textAlign: 'center' }}
                        >
                           
                        </Card>
                        </Link>
                    </List.Item>
                )}
            />
            )}
            
           
        </>
    );
};