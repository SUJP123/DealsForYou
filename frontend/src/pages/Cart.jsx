import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getItemsInCart, toggleCart} from '../service/user';
import './../styles/Cart.css';

function Cart() {
    const dispatch = useDispatch();
    const { items, showCart, status } = useSelector((state) => state.cart);

    useEffect(() => {
        if (showCart) {
            dispatch(getItemsInCart());
        }
    }, [showCart, dispatch]);

    return (
        <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
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