import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import { AuthContext } from '../Providers/AuthProvider';

const Header = () => {

    const {user,logOut} = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
        .then(result => { })
        .catch(error => console.error(error));
    }
    

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
            <a href="/">Shop</a>
            <a href="/orders">Orders</a>
            <a href="/inventory">Inventory</a>
            <a href="/login">Login</a>
            <a href="/signup">SignUp</a>
            {user && <span className='text-white'>Wellcome{user.email} <button onClick={handleLogOut}>Log Out</button></span>}
            </div>
        </nav>
    );
};

export default Header;