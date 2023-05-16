import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const totalPages = Math.ceil(totalProducts / itemsPerPage)


    // const pageNumbers = [];

    // for(let i = 1 ; i< 10; i++){
    //     pageNumbers.push(i);
    // }

    const pageNumbers = [...Array(totalPages).keys()]

    /***
     * 1 Done: 1. Determine the number of items;
     * 2. TODO: 2. Decide on the number of items per page;
     * 3. Done: 3. Calculate the total number of pages;
     * 4. DONE: 4. Determine the current page;
     */



    // console.log(totalProducts);

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])


    useEffect(() => {
        async function fatchData() {

            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data =  await response.json();
            setProducts(data);
        }
        fatchData();
    }, [currentPage, itemsPerPage]);



    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1 : get id of the addedProduct
        for (const id in storedCart) {
            // step 2 : get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3 : get quntity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4 : add the added product to the saved the cart
                savedCart.push(addedProduct);
            }
        }
        // step 5 : set the cart
        setCart(savedCart);
    }, [products]);


    // delete cart add item 
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const handleAddToCart = (product) => {
        // console.log(product);
        // console.log(cart);
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exit in the cart, then set quantity = 1
        // if exit quantity update by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product._id);
    }
    const options = [5, 10, 15, 20];
    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0)
    }
    return (
        <>
            <div className='shop-container'>
                <div className='products-container'>
                    {
                        products.map(product => <Product
                            product={product}
                            key={product._id}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className='cart-container'>
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
            {/* pagination */}
            <div className="pagination">
                <h3>page Number :{currentPage}</h3>
                {
                    pageNumbers.map(number =>
                        <button key={number}
                            className={currentPage === number ? 'selected' : ''}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}

                            </option>
                        ))
                    }

                </select>
            </div>
        </>
    );
};

export default Shop;