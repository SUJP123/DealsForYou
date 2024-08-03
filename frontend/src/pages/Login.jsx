import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/auth';
import './../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const {status, error} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(loginUser({email, password})).unwrap();
            navigate('/dashboard')
        } catch(error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='login'>
            <div className='login-header'>
                <h2>Login</h2>
            </div>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <div className='login-form-Email'>
                        <label>Email:</label>
                        <input type='text'
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </div>
                    <div className='login-form-Password'>
                        <label>Password:</label>
                        <input type='text'
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                    </div>
                    <div className='login-form-Button'>
                        <button type='submit'>Login</button>
                        {status === 'failed' && <p>Error Logging In</p>}
                    </div>
                </form>

            </div>
        </div>
    )

}

export default Login;