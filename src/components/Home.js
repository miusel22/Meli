
import React from 'react';
import { Carousel } from 'antd';
import b1 from '../img/banner_1.png';
import b2 from '../img/banner_2.png';
import b3 from '../img/banner_3.png';
import { Products } from './Products';


export const Home = () => {

    return (
        <>
            <Carousel autoplay className='banner'>
                <div>
                    <img src={b1} alt="banner_1" />
                </div>
                <div>
                    <img src={b2} alt="banner_2" />
                </div>
                <div>
                    <img src={b3} alt="banner_3" />
                </div>
            </Carousel>
            <Products />

        </>
    );
}