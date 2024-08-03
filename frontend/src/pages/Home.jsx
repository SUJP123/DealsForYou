import React from 'react';
import {Link} from "react-router-dom";
import Register from './Register';
import './../styles/Home.css';
import nikeLogo from './../assets/nike_logo.png';
import adidasLogo from './../assets/adidas_logo.png';
import pumaLogo from './../assets/puma_logo.png';
import forever21Logo from './../assets/forever21_logo.png';
import underArmourLogo from './../assets/under_armour.png';
import lululemonLogo from './../assets/lululemon_logo.png';

function Home() {
    return (
        <div className='home'>
            <div className='home-headers'>
                <h1>Welcome to DealsForYou</h1>
            </div>
            <div className='home-about'>
                <p>Discover the best deals on your favorite brands and products.
                    Whether you're looking for the latest in fashion, sportswear, or casual attire,
                    we've got you covered with unbeatable offers and discounts.</p>
            </div>
            <div className='home-auth'>
                <div className='home-login'>
                    <p>Log in Below!</p>
                    <button className='home-button'>
                        <Link to='/login' className='link-button'>Login</Link>
                    </button>
                </div>
                <div className='home-register'>
                    <p>Don't have an account?</p>
                    <Register />
                </div>
            </div>
            <div className='home-featured'>
                <h2>Featured Brands</h2>
                <div className='home-logos'>
                    <img src={nikeLogo} alt="Nike" />
                    <img src={adidasLogo} alt="Adidas" />
                    <img src={pumaLogo} alt="Puma" />
                    <img src={forever21Logo} alt="Forever 21" />
                    <img src={underArmourLogo} alt="Under Armour" />
                    <img src={lululemonLogo} alt="Lululemon" />
                </div>
            </div>
            <div className='home-services'>
                <div className='service-header'>
                    <h2>Our Services</h2>
                </div>
                <div className='service'>
                    <h3>Exclusive Deals</h3>
                    <p>Get access to exclusive deals and discounts on top brands.</p>
                </div>
                <div className='service'>
                    <h3>Easy Shopping</h3>
                    <p>Browse and purchase your favorite items effortlessly.</p>
                </div>
                <div className='service'>
                    <h3>AI Powered Selections</h3>
                    <p>Enjoy personalized picks based on your previous purchases.</p>
                </div>
            </div>
            <div className='home-footer'>
                <p>&copy; 2024 DealsForYou. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Home;