import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './../styles/Shop.css';
import Navbar from "../components/Navbar";
import Cart from "./Cart";
import {useDispatch} from "react-redux";
import RatingPopup from "./RatingPopup";
import PromoList from "./PromoList";

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
    const dispatch = useDispatch();
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [productToRate, setProductToRate] = useState(null);
    const [showPromoPopup, setShowPromoPopup] = useState(false);
    const [productForPromo, setProductForPromo] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleBuyNow = (product) => {
        setProductToRate(product);
        setShowRatingPopup(true);
        window.open(product.externalURL, '_blank');
    };

    const handleProductClick = (product) => {
        setProductForPromo(product);
        setShowPromoPopup(true);
    };


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
            company: company.toLowerCase(),
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

    const handleCartRefresh = async() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const id = await axios.get(`${BACKEND_API}/api/v1/customer/search/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userId = id.data;

        const response = await axios.get(`${BACKEND_API}/api/v1/customer/${userId}/getcart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

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
        await handleCartRefresh();
    };

    return (
        <div className='shop'>
            <Navbar/>
            {showRatingPopup && (
                <RatingPopup product={productToRate} onClose={() => {setShowRatingPopup(false); setProductToRate(null);}} />
            )}
            {showPromoPopup && productForPromo && (
                <PromoList
                    company={productForPromo.company}
                    clothingType={productForPromo.clothingType}
                    onClose={() => setShowPromoPopup(false)}
                />
            )}
            <div className='header'>
                <div className='title'>
                    <h1>Explore the shop below</h1>
                </div>
                <div className='about'>
                    <p>Filter through products and find the best deals.</p>
                    <p>Click on products to see any related promos.</p>
                </div>
                <div className='cart-btn'>
                    <button className="cart-toggle" onClick={toggleCart}>
                        {showCart ? 'Hide Cart' : 'Show Cart'}
                    </button>
                    <Cart showCart={showCart}/>
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
                                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Boy">Boy</option>
                                        <option value="Girl">Girl</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Company:
                                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Clothing Type:
                                    <input type="text" value={clothing} onChange={(e) => setClothing(e.target.value)}/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Low Price:
                                    <input type="number" value={lowPrice}
                                           onChange={(e) => setLowPrice(e.target.value)}/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    High Price:
                                    <input type="number" value={highPrice}
                                           onChange={(e) => setHighPrice(e.target.value)}/>
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
                                <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
                                    <h2>{product.name}</h2>
                                    <img className="image" src={product.image} alt="Product-Image"/>
                                    <p>Retail Price: ${product.retail}</p>
                                    <p>Deal Price: ${product.deal}</p>
                                    <p>{product.saved}</p>
                                    <p>Clothing Type: {product.clothingType}</p>
                                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                    <button onClick={() => handleBuyNow(product)}>Buy Now</button>
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

