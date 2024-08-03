import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import './../styles/Dashboard.css';
import RatingPopup from "./RatingPopup";


function Dashboard() {
    const [profile, setProfile] = useState(null)
    const [products, setProducts] = useState([])
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [productToRate, setProductToRate] = useState(null);
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const BACKEND_API = 'http://localhost:8080'
    const FLASK_API = 'http://127.0.0.1:5000/recommend'

    const handleBuyNow = (product) => {
        setProductToRate(product);
        setShowRatingPopup(true);
        window.open(product.externalURL, '_blank');
    };

    const handleAddToCart = async (product) => {
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

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const id = await axios.get(`${BACKEND_API}/api/v1/customer/search/${email}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                const userId = id.data;
                const user = await axios.get(`${BACKEND_API}/api/v1/customer/${userId}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });
                setProfile(user.data);

                const products = await axios.post(`${FLASK_API}`, {
                    "user_id": userId
                })

                const userProducts = products.data.recommendations
                console.log(userProducts);

                let prods = [ ]
                for (let i = 0; i < userProducts.length; i++) {
                    let prodId = userProducts[i];
                    let prod = await axios.get(`${BACKEND_API}/api/v1/products/search/${prodId}`, {
                        headers: {
                            'Authorization' : `Bearer ${token}`
                        }
                    });
                    prods.push(prod.data);
                }
                setProducts(prods);
            }
            catch (error) {
                console.error('Failed to fetch profile: ', error);
            }
        };
        fetchProfile()
    }, [token, email])

    return (
        <div>
            <Navbar />
            {showRatingPopup && (
                <RatingPopup product={productToRate} onClose={() => {setShowRatingPopup(false); setProductToRate(null);}} />
            )}
            <div className='dashboard'>
                {profile &&
                    <div className='dashboard-header'>
                        <h1>Welcome to your Dashboard, {profile.firstName} {profile.lastName}</h1>
                    </div>
                }
                <div className='user-picks'>
                    <p id='pick-header'>Personalized Picks</p>
                    <div className="dashboard-products-section">
                        <div className="dashboard-products-grid">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <div className="dashboard-product-card" key={product.id}>
                                        <h2>{product.name}</h2>
                                        <img className="image" src={product.image} alt="Product-Image" />
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
                <div className='shopping'>
                    <p>Explore the full Shop</p>
                    <button>
                        <Link to='/shop'>Explore Shop</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;