import React, { useState } from 'react';
import './../styles/RatingPopup.css';
import axios from "axios";

const RatingPopup = ({ product, onClose }) => {
    const [rating, setRating] = useState(0);
    const BACKEND_API = 'http://localhost:8080';

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleSubmit = async () => {
        console.log(`Rated product ${product?.name} with ${rating} stars`);
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const id = await axios.get(`${BACKEND_API}/api/v1/customer/search/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userId = id.data;

        const response = await axios.post(`${BACKEND_API}/api/v1/customer/bought/${product.id}/${userId}/${rating}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        onClose();
    };

    if (!product) return null;

    return (
        <div className="overlay">
            <div className="popup">
                <h2>Rate Your Purchase</h2>
                <p>How would you rate you purchase of {product.name}?</p>
                <div className="rating-options">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star}>
                            <input
                                type="radio"
                                value={star}
                                checked={rating == star}
                                onChange={handleRatingChange}
                            />
                            {star} Star{star > 1 && 's'}
                        </label>
                    ))}
                </div>
                <p>This data helps with providing more personalized selections.</p>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default RatingPopup;
