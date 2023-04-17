import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import { AuthContext } from '../Providers/AuthProvider';

const Header = () => {

    const {user} = useContext(AuthContext);
    console.log(user);

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
            <a href="/">Shop</a>
            <a href="/orders">Orders</a>
            <a href="/inventory">Inventory</a>
            <a href="/login">Login</a>
            <a href="/signup">SignUp</a>
            {user && <span>Wellcome{user.email}</span>}
            </div>
        </nav>
    );
};

export default Header;