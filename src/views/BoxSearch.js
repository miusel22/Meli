import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Logo from '../img/Logo.png';
import { Home } from '../components/Home';
import _  from 'lodash';

const { Search } = Input;

export const BoxSearch = () => {
    const params = useParams();


    const [show, setShow] = useState(false);

    useEffect(() => {
        if (_.isEmpty(params)) {
            setShow(true);
        }
    }, [params]);

    const navigate = useNavigate();

    return (
        <>
            <header>
                <div className="box">
                    <Link to="/">
                        <img src={Logo} alt="logo" />
                    </Link>
                    <Search
                        className="custom-search"
                        placeholder="Nunca dejes de buscar"
                        onSearch={(value) => {
                            navigate(`/items/${value}`);
                        }}
                        enterButton
                    />
                </div>
            </header>
            {show && <Home />}
        </>
    );
};