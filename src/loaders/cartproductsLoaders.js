import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
const loadedProducts = await fetch('http://localhost:5000/products');
const products = await loadedProducts.json();

// if card data is database, you have to use async await
const storedCart = getShoppingCart();
// console.log(storedCart);
const savedCart = [];

for(const id in storedCart){
    const addedProduct = products.find(pd => pd._id === id)

    if(addedProduct){
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        console.log(quantity);
        savedCart.push(addedProduct);

    }
}
return savedCart;
}

export default cartProductsLoader ;