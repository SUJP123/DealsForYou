import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './../styles/Promos.css';

function Promos() {
    const [promos, setPromos] = useState([]);
    const [company, setCompany] = useState('');
    const [visibleCount, setVisibleCount] = useState(100);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/promo/filter', {
                    params: {
                        company: company.toLowerCase(),
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPromos(response.data);
            } catch (error) {
                console.error('Error fetching promos:', error);
            }
        };

        fetchPromos();
    }, [company, token]);

    const handleFilterChange = (event) => {
        setCompany(event.target.value);
    };

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight && visibleCount < promos.length) {
            setVisibleCount(prevCount => prevCount + 5);
        }
    };

    return (
        <div className='promos'>
            <Navbar />
            <div className="promos-page">
                <div className="promo-header">
                    <div className="promo-title">
                        <h1>Available Promos</h1>
                    </div>
                    <div className="promo-filter-section">
                        <label htmlFor="company">Filter by company:</label>
                        <input
                            type="text"
                            id="company"
                            value={company}
                            onChange={handleFilterChange}
                            placeholder="Enter company name"
                        />
                    </div>
                </div>
            <div className="promo-container" onScroll={handleScroll}>
                {promos.slice(0, visibleCount).map(promo => (
                    <div key={promo.id} className="promo-card">
                        <h3>{promo.description}</h3>
                        <p>{promo.code_required ? `Code: ${promo.promo_code}` : 'No code required'}</p>
                        <a href={promo.url} target="_blank" rel="noopener noreferrer">Get Deal</a>
                    </div>
                ))}
                {visibleCount < promos.length && (
                    <div className="load-more">Scroll down to load more promos...</div>
                )}
            </div>
        </div>
        </div>
    );
}

export default Promos;
