import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItemsInCart, toggleCart } from '../service/user';
import './../styles/Cart.css';
import axios from "axios";
import RatingPopup from "./RatingPopup";

function Cart({ showCart }) {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.cart);
    const BACKEND_API = 'https://dealsforyou-220ae0f9b292.herokuapp.com';
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [productToRate, setProductToRate] = useState(null);

    useEffect(() => {
        if (showCart) {
            dispatch(getItemsInCart());
        }
    }, [showCart, dispatch]);

    const handlePurchase = async(item) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const id = await axios.get(`${BACKEND_API}/api/v1/customer/search/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userId = id.data;

        const response = await axios.put(`${BACKEND_API}/api/v1/customer/update/${userId}/${item.id}`,
            {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        dispatch(getItemsInCart());

        setProductToRate(item);
        setShowRatingPopup(true);

        return response.data;
    };

    const handleDelete = async (ids) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const id = await axios.get(`${BACKEND_API}/api/v1/customer/search/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userId = id.data;

        const response = await axios.put(`${BACKEND_API}/api/v1/customer/delete/${userId}/${ids}`,
            {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

        dispatch(getItemsInCart());
        return response.data;
    };

    return (
        <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
            {showRatingPopup && (
                <RatingPopup product={productToRate} onClose={() => {setShowRatingPopup(false); setProductToRate(null);}} />
            )}
            <button className="cart-toggle-button" onClick={() => dispatch(toggleCart())}>
                {showCart ? 'Close Cart' : 'Open Cart'}
            </button>
            {showCart && (
                <div className="cart-content">
                    <h2>Your Cart</h2>
                    {status === 'loading' && <p>Loading...</p>}
                    {status === 'succeeded' && (
                        items.length > 0 ? (
                            items.map((item, index) => (
                                <div className="cart-item" key={index}>
                                    <h3>{item.name}</h3>
                                    <p>Deal Price: ${item.deal}</p>
                                    <img className='cart-image' src={item.image} alt='image' />
                                    <button onClick={() => handleDelete(item.id)}>Remove From Cart</button>
                                    <button onClick={() => handlePurchase(item)}>Mark as Purchased</button>
                                    <a href={item.externalURL} target="_blank" rel="noopener noreferrer">Buy Now</a>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )
                    )}
                    {status === 'failed' && <p>Failed to load cart items.</p>}
                </div>
            )}
        </div>
    );
}

export default Cart;
