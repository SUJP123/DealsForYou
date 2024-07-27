import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/Shop.css';

function Shop() {
    const [products, setProducts] = useState([]);
    const [gender, setGender] = useState('');
    const [company, setCompany] = useState('');
    const [clothing, setClothing] = useState('');
    const [lowPrice, setLowPrice] = useState('');
    const [highPrice, setHighPrice] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const BACKEND_API = 'http://localhost:8080';
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (filters = {}) => {
        try {
            const response = await axios.get(`${BACKEND_API}/api/v1/products/filter`, {
                headers : {
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

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="shop-container">
            <button className="filter-toggle-button" onClick={toggleFilters}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            {showFilters && (
                <form className="filter-form" onSubmit={handleSubmit}>
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
            )}
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <div className="product-card" key={product.id}>
                            <h2>{product.name}</h2>
                            <img className='image' src={product.image} alt={'Product-Image'} />
                            <p>Retail Price: ${product.retail}</p>
                            <p>Deal Price: ${product.deal}</p>
                            <p>{product.saved}</p>
                            <p>Clothing Type: {product.clothingType}</p>
                            <a href={product.externalURL} target="_blank" rel="noopener noreferrer">Buy Now</a>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default Shop;
