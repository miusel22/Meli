
import React from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
;

const { Search } = Input;


export const BoxSearch = () => {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <Search placeholder="Nunca dejes de buscar" onSearch={(value) => {
                    navigate(`/items/${value}`);
                }} enterButton />

            </header>

        </>
    );
}