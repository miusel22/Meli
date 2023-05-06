
import React from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/Logo.png';
const { Search } = Input;


export const BoxSearch = () => {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <div className='box'>
                    <img src={Logo}></img>
                    <Search className="custom-search" placeholder="Nunca dejes de buscar" onSearch={(value) => {
                        navigate(`/items/${value}`);
                    }} enterButton />
                </div>

            </header>

        </>
    );
}