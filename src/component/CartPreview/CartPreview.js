import { getShoppingCart } from "../../utilities/fakedb";

const handleCartPreview = async () => {
    const getItemFromStorage = getShoppingCart();
    const cartItems = Object.keys(getItemFromStorage);
    const productData = await fetch('http://localhost:5000/cartProducts', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(cartItems)
    });
    const products = await productData.json();


    let previousItem = [];
    for (const Id in getItemFromStorage) {
        const addedItem = products.find(product => product._id === Id);
        addedItem.quantity = getItemFromStorage[Id];
        previousItem.push(addedItem);
    }
    return previousItem;
}

export default handleCartPreview; 