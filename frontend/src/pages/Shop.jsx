import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './../styles/Shop.css';
import Navbar from "../components/Navbar";
import Cart from "./Cart";
import {addItemToCart} from "../service/user";
import {useDispatch} from "react-redux";

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
    const [showCart, setShowCart] = useState(false);
    const { dispatch } = useDispatch();

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

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const id = await axios.get(`${BACKEND_API}/api/v1/customer/search/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userId = id.data;

        const response = await axios.post(`${BACKEND_API}/api/v1/customer/cart/${product.id}/${userId}`,
            {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    };

    return (
        <div className = 'shop'>
            <Navbar />
            <Cart />
        <div className='header'>
            <div className='title'>
                <h1>Explore the shop below</h1>
            </div>
            <div className='about'>
                <p>Filter through products and find the best deals.</p>
            </div>
        </div>
    <div className="shop-container">
        <div className="filter-section">
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
            </div>
            <div className="products-section">
                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div className="product-card" key={product.id}>
                                <h2>{product.name}</h2>
                                <img className="image" src={product.image} alt="Product-Image"/>
                                <p>Retail Price: ${product.retail}</p>
                                <p>Deal Price: ${product.deal}</p>
                                <p>{product.saved}</p>
                                <p>Clothing Type: {product.clothingType}</p>
                                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                <a href={product.externalURL} target="_blank" rel="noopener noreferrer">Buy Now</a>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default Shop;
