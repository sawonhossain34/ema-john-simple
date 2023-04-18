import React, { useContext } from 'react';
import './Login.css'
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {


    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location?.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email =form.email.value;
        const password = form.password.value;
        console.log(email,password);

        signIn(email,password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            form.reset();
            navigate(from , {replace : true});
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin} >
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <input className='btn-submit' type="submit" value='Login' />

            </form>
            <p><small>New to Ema John? <Link to='/signup'>Create New Account</Link></small></p>
        </div>
    );
}; 


export default Login;