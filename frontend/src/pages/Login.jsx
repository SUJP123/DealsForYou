import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/auth';

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
        <div className='Login'>
            <div className='Header'>
                <h2>Login</h2>
            </div>
            <div className='Form'>
                <form onSubmit={handleSubmit}>
                    <div className='Form-Email'>
                        <label>Email:</label>
                        <input type='text'
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </div>
                    <div className='Form-Password'>
                        <label>Password:</label>
                        <input type='text'
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                    </div>
                    <div className='Form-Button'>
                        <button type='submit'>Login</button>
                        {status === 'failed' && <p>Error Logging In</p>}
                    </div>
                </form>

            </div>
        </div>
    )

}

export default Login;