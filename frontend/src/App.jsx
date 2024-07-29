import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store"
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Bought from "./pages/Bought";
import Shop from "./pages/Shop";
import RatingPopup from "./pages/RatingPopup";


const App = () => (
    <Provider store={store}>
        <Router>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/shop" element={<Shop />} />
                <Route exact path='/purchases' element={<Bought />} />
            </Routes>
        </Router>
    </Provider>
);

export default App;