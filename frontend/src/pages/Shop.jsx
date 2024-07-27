import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Shop() {
    const [products, setProducts] = useState([]);
    const [gender, setGender] = useState('');
    const [company, setCompany] = useState('');
    const [clothing, setClothing] = useState('');
    const [lowPrice, setLowPrice] = useState('');
    const [highPrice, setHighPrice] = useState('');
    const token = localStorage.getItem('token');
    const BACKEND_API = 'http://localhost:8080'

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (filters = {}) => {
        try {
            const response = await axios.get(`${BACKEND_API}/api/v1/products/filter`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: filters
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const filters = {
            gender,
            company,
            clothingType: clothing,
            minRetail: lowPrice,
            maxRetail: highPrice
        };
        fetchProducts(filters);
    };

    return (
        <div className='Shop'>
            <div className='Filter'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Gender:
                            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Company:
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Clothing Type:
                            <input type="text" value={clothing} onChange={(e) => setClothing(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Low Price:
                            <input type="number" value={lowPrice} onChange={(e) => setLowPrice(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            High Price:
                            <input type="number" value={highPrice} onChange={(e) => setHighPrice(e.target.value)} />
                        </label>
                    </div>
                    <button type="submit">Filter</button>
                </form>
            </div>
            <div className='Products'>
                {products.length > 0 ? (
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <h2>{product.name}</h2>
                                <p>Retail Price: ${product.retail}</p>
                                <p>Deal Price: ${product.deal}</p>
                                <p>Company: {product.company}</p>
                                <p>Clothing Type: {product.clothingType}</p>
                                <p>Gender: {product.gender}</p>
                                <a href={product.externalURL} target="_blank" rel="noopener noreferrer">Buy Now</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default Shop;

