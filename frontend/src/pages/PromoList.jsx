import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../styles/PromoList.css';

const PromoList = ({ company, clothingType, onClose }) => {
    const [promos, setPromos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                let clothing = null;
                if (clothingType.includes('Shoe')) {
                    clothing = 'Shoe';
                } else if (clothingType.includes('Shirt')) {
                    clothing = 'Shirt';
                } else if (clothingType.includes('Pant')) {
                    clothing = 'Pant';
                } else if (clothingType.includes('Short')) {
                    clothing = 'Short';
                } else if (clothingType.includes('Jacket')) {
                    clothing = 'Jacket';
                } else if (clothingType.includes('Hoodie')) {
                    clothing = 'Hoodie';
                } else if (clothingType.includes('Top')) {
                    clothing = 'Top';
                }

                const response = await axios.get('http://localhost:8080/api/v1/promo/filter', {
                    params: {
                        "company": company,
                        "clothingType": clothing
                    },
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setPromos(response.data);
            } catch (error) {
                console.error('Error fetching promos:', error);
            }
        };

        fetchPromos();
    }, [company, clothingType]);

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight) {
            setVisibleCount(prevCount => Math.min(prevCount + 5, promos.length));
        }
    };

    return (
        <div className="promo-popup">
            <div className="promo-popup-content" onScroll={handleScroll}>
                <button className="close-button" onClick={onClose}>Close</button>
                <h2>Available Promos</h2>
                {promos.slice(0, visibleCount).map(promo => (
                    <div key={promo.id} className="promo-card">
                        <h3>{promo.description}</h3>
                        <p>{promo.code_required ? `Code: ${promo.promo_code}` : 'No code required'}</p>
                        <a href={promo.url} target="_blank" rel="noopener noreferrer">Get Deal</a>
                    </div>
                ))}
                {visibleCount < promos.length && (
                    <div className="load-more">See more promos in the promos tab...</div>
                )}
            </div>
        </div>
    );
};

export default PromoList;

