export const removeStoreFromCart = (storeName, setCartItemsNEW) => {
    setCartItemsNEW((prevCart) => {
        const newCart = { ...prevCart };
        // Find the key that matches the storeName and delete it
        Object.keys(newCart).forEach((key) => {
            if (newCart[key].name === storeName) {
                delete newCart[key];
            }
        });
        return newCart;
    });
};