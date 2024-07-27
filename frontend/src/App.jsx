import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store"
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => (
    <Provider store={store}>
        <Router>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/dashboard/*" element={<Dashboard />} />
                <Route exact path="/" element={<Home />} />
            </Routes>
        </Router>
    </Provider>
);

export default App;