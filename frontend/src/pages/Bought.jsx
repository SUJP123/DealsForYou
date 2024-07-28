import React, {useEffect, useState} from 'react';
import axios from "axios";
import Navbar from "../components/Navbar";


function Bought() {
    const [products, setProducts] = useState([])
    const BACKEND_API = 'http://localhost:8080';

    useEffect(() => {
        displayBought();
    }, []);

    const displayBought = async() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const id = await axios.get(`${BACKEND_API}/api/v1/customer/search/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userId = id.data;

        const response = await axios.get(`${BACKEND_API}/api/v1/customer/bought/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setProducts(response.data);
    }

    return (
        <div className='bought'>
            <Navbar />
            <div className='header'>
                <h1>View Your Recent Purchases Below</h1>
            </div>
            <div className='product-grid'>
                {products.length > 0 ? (
                    products.map(product => (
                        <div className="product-card" key={product.id}>
                            <h2>{product.name}</h2>
                            <img className="image" src={product.image} alt="Product-Image"/>
                            <p>Retail Price: ${product.retail}</p>
                            <p>Deal Price: ${product.deal}</p>
                            <p>{product.saved}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

        </div>

    )
}

export default Bought;