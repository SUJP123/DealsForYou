import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './../styles/Navbar.css';

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks)
    }

    return (
        <div className='navbar'>
            <div className='leftside' id={openLinks ? "open" : "close"}>
                <div className="hiddenLinks">
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className='rightSide'>
                    <Link to='/'>Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/purchases">Purchases</Link>
                    <button onClick={toggleNavbar}>Button</button>
                </div>
            </div>

        </div>
    )

}

export default Navbar;