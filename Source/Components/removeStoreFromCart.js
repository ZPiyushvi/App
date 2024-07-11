export const removeStoreFromCart = (storeName, setCartItems, campusShops, setcampusShops) => {
    setCartItems((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[storeName];
        return newCart;
    });

    const updatedShops = campusShops.map(shop => {
        if (shop.name === storeName) {
            const updatedMenu = shop.menu.map(category => {
                const updatedItems = category.items.map(item => {
                    return {
                        ...item,
                        quantity: 0 // Update to a number instead of a string
                    };
                });
                return { ...category, items: updatedItems };
            });
            return { ...shop, menu: updatedMenu };
        }
        return shop;
    });

    setcampusShops(updatedShops);
};  