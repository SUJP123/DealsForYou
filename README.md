# DealsForYou

DealsForYou is a web application designed to provide users with personalized product recommendations and discounts. It integrates a Spring Boot backend with a Flask service for machine learning-based recommendations, along with a React frontend to deliver a seamless user experience. This project showcases the integration of machine learning techniques for recommendation systems, database management, and web development skills.

## See additional github repos used to make this project
- ML model
  - https://github.com/SUJP123/Clothing-Recommendation-System
- Scrapers
  - https://github.com/SUJP123/Clothing-Scraper

# Table of Contents
Features
Tech Stack
Setup and Installation
Register and Login
Machine Learning Model
API Endpoints
Contributing
License

# Features
User authentication and authorization.
Personalized product recommendations based on user purchase history.
Filtering products by various attributes such as gender, company, and clothing type.
Adding products to a cart and managing the cart.
Rating purchased products.
Viewing and applying available promos.

# Tech Stack
Frontend: React, CSS
Backend: Spring Boot, PostgreSQL
Machine Learning: Flask, TensorFlow, scikit-learn
Others: Docker, Gunicorn, Nginx

# Prerequisites
Java 11 or higher
Python 3.8 or higher
Node.js and npm
PostgreSQL
Docker (for deployment)
Installation
Clone the repository

# Register and Login:

Navigate to the homepage and register a new account.
Login with your credentials.
Explore Products:

Use the filters to find products.
Add products to your cart.
Recommendations:

View personalized recommendations on your dashboard.
Purchase products and rate them.
Promos:
Click on products to view available promos.


# Machine Learning Model
The machine learning model used in this project is a neural network built using TensorFlow. It is trained to recommend products based on the user's purchase history. The model is updated periodically with new data to ensure accurate recommendations. Note: CURRENTLY REVAMPING MODEL, SO TEMPORARY RECOMMENDED DATABASE TABLE IS USED TO HANDLE RECOMMENDATIONS. CHECK OUT MODEL HERE -> 

# Training the Model
Data is fetched from the PostgreSQL database.
Images are preprocessed and categorized.
A CNN model is trained on the image data.
Recommendations are generated using the trained model.
# API Endpoints
- User Authentication (Spring Boot)
  - POST /api/v1/auth/register: Register a new user.
  - POST /api/v1/auth/login: Login an existing user.
- Product Management (Spring Boot)
  - GET /api/v1/products: Fetch all products.
  - GET /api/v1/products/filter: Fetch filtered products.
  - GET /api/v1/products/:id: Fetch a product by ID.
- Recommendations (Flask)
  - POST /recommend: Generate product recommendations for users. (REFER TO NOTE IN PREVIOUS SECTION)
- Cart Management (Spring Boot)
  - POST /api/v1/customer/cart/:productId/:userId: Add a product to the user's cart.
  - GET /api/v1/customer/:userId/getcart: Get the user's cart.

# Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features you'd like to add.

# Fork the repository.
Create your feature branch: git checkout -b feature/AmazingFeature.
Commit your changes: git commit -m 'Add some AmazingFeature'.
Push to the branch: git push origin feature/AmazingFeature.
Open a pull request.
