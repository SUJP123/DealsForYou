import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";


function Dashboard() {
    const [profile, setProfile] = useState(null)
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const BACKEND_API = 'http://localhost:8080/api/v1'

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const id = await axios.get(`${BACKEND_API}/customer/search/${email}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                const userId = id.data;
                const user = await axios.get(`${BACKEND_API}/customer/${userId}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });
                setProfile(user.data);
            }
            catch (error) {
                console.error('Failed to fetch profile: ', error);
            }
        };
        fetchProfile()
    }, [token, email])

    return (
        <div className='Dashboard'>
            <Navbar />
            {profile &&
                <div className='Header'>
                    <h1>Welcome to your dashboard, {profile.firstName} {profile.lastName}</h1>
                </div>
            }
            <div className='User-Picks'>
                <p>Personalized Picks</p>
            </div>
            <div className='Shopping'>
                <p>Explore the full Shop</p>
                <button>
                    <Link to='/shop'>Explore Shop</Link>
                </button>
            </div>
        </div>
    )
}

export default Dashboard;