
import React,{ useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Carousel, Spin } from 'antd';
import b1 from '../img/banner_1.png';
import b2 from '../img/banner_2.png';
import b3 from '../img/banner_3.png';
import { Products } from './Products';


export const Home = () => {
    const [load, setLoad] = useState(true);
    const { loading } = useSelector((state) => state);
    useEffect(() => {
        if (!loading) {
            setLoad(false);
        }

    }, [loading]);

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
            {!load ? ( <Products />) : <Spin/>}

        </>
    );
}