import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {

    // if card data is database, you have to use async await
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    const loadedProducts = await fetch('http://localhost:5000/productsByIds',{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(ids)
    });
    const products = await loadedProducts.json();
    console.log('products by id:', products)

    // console.log(storedCart);
    const savedCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id)

        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            console.log(quantity);
            savedCart.push(addedProduct);

        }
    }
    return savedCart;
}

export default cartProductsLoader;