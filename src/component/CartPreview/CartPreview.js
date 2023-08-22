import { getShoppingCart } from "../../utilities/fakedb";

const handleCartPreview = async () => {
    const productData = await fetch('products.json');
    const products = await productData.json();

    let previousItem = [];
    const getItemFromStorage = getShoppingCart();
    for (const Id in getItemFromStorage) {
        const addedItem = products.find(product => product.id === Id);
        addedItem.quantity = getItemFromStorage[Id];
        previousItem.push(addedItem);
    }
    return previousItem;
}

export default handleCartPreview; 