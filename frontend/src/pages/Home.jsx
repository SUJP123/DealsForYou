import React from 'react';
import {Link} from "react-router-dom";
import Register from './Register';
import './../styles/Home.css';


function Home() {

    return (
        <div className='home'>
            <div className='home-headers'>
                <h1>Welcome to DealsForYou</h1>
            </div>
            <div className='home-about'>
                <p>About</p>
            </div>
            <div className='home-auth'>
                <div className='home-login'>
                    <p>Log in Below!</p>
                    <button>
                        <Link to='/login'>Login</Link>
                    </button>

                </div>
                <div className='home-egister'>
                    <p>Don't have an account?</p>
                    <Register />
                </div>
            </div>
        </div>
    )
}

export default Home;