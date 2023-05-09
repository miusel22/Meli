import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/Logo.png';
import { Home } from '../components/Home';

const { Search } = Input;

export const BoxSearch = ({ showHome = true }) => {
  const [show, setShow] = useState(showHome);
  useEffect(() => {
    setShow(showHome ?? true);
  }, [showHome]);

  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="box">
          <img src={Logo} alt="Logo de la aplicación" role="img" />
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