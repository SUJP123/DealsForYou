import React, {useState, useEffect} from 'react';
import axios from 'axios';


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
            {profile &&
                <div>
                    <h1>Welcome to your dashboard, {profile.firstName} {profile.lastName}</h1>
                </div>
            }

        </div>
    )
}

export default Dashboard;