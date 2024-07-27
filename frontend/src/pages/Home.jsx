import React from 'react';
import {Link} from "react-router-dom"
import Register from './Register';


function Home() {

    return (
        <div className='Home'>
            <div className='Headers'>
                <h1>Welcome to DealsForYou</h1>
            </div>
            <div className='About'>
                <p>About Section</p>
            </div>
            <div className='Auth'>
                <div className='Login'>
                    <p>Log in Below!</p>
                    <button>
                        <Link to='/login'>Login</Link>
                    </button>

                </div>
                <div className='Register'>
                    <p>Don't have an account?</p>
                    <Register />
                </div>
            </div>
        </div>
    )
}

export default Home;