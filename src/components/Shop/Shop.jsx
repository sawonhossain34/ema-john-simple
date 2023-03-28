import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setcart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect( () => {
        const storedCart = getShoppingCart();
        // console.log(storedCart);
    } ,[])

    const handleAddToCart = (product) => {
        // console.log(product);
        console.log(cart);
        const newCart = [...cart, product];
        setcart(newCart)
        addToDb(product.id);
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;