// cartHandlers.js
import { useCallback } from 'react';

export const handleIncrement = (menuItems, setMenuItems, setCartItems) => useCallback((id, title, itemName, hotelName) => {
    const updatedMenuItems = [...menuItems];
    const categoryIndex = updatedMenuItems.findIndex(category => category.title === title);

    if (categoryIndex !== -1) {
        const itemIndex = updatedMenuItems[categoryIndex].items.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            updatedMenuItems[categoryIndex].items[itemIndex] = {
                ...updatedMenuItems[categoryIndex].items[itemIndex],
                quantity: String(parseInt(updatedMenuItems[categoryIndex].items[itemIndex].quantity) + 1)
            };

            setMenuItems(updatedMenuItems);

            setCartItems(prevCartItems => {
                const hotelCart = prevCartItems[hotelName] || [];
                const existingCartItemIndex = hotelCart.findIndex(item => item.item === itemName);

                if (existingCartItemIndex !== -1) {
                    hotelCart[existingCartItemIndex] = {
                        ...hotelCart[existingCartItemIndex],
                        quantity: String(parseInt(hotelCart[existingCartItemIndex].quantity) + 1)
                    };
                } else {
                    const menuItemToAdd = updatedMenuItems[categoryIndex].items[itemIndex];
                    menuItemToAdd.quantity = "1";
                    hotelCart.push(menuItemToAdd);
                }

                return {
                    ...prevCartItems,
                    [hotelName]: hotelCart
                };
            });
        }
    }
}, [menuItems, setCartItems]);

export const handleDecrement = (menuItems, setMenuItems, setCartItems) => (id, title, itemName, hotelName) => {
    const updatedMenuItems = [...menuItems];
    const categoryIndex = updatedMenuItems.findIndex(category => category.title === title);

    if (categoryIndex !== -1) {
        const itemIndex = updatedMenuItems[categoryIndex].items.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            if (parseInt(updatedMenuItems[categoryIndex].items[itemIndex].quantity) > 0) {
                updatedMenuItems[categoryIndex].items[itemIndex] = {
                    ...updatedMenuItems[categoryIndex].items[itemIndex],
                    quantity: String(parseInt(updatedMenuItems[categoryIndex].items[itemIndex].quantity) - 1)
                };

                setMenuItems(updatedMenuItems);

                setCartItems(prevCartItems => {
                    const hotelCart = prevCartItems[hotelName] || [];
                    const existingCartItemIndex = hotelCart.findIndex(item => item.item === itemName);

                    if (existingCartItemIndex !== -1) {
                        const updatedCartItems = [...hotelCart];
                        const newQuantity = String(parseInt(updatedCartItems[existingCartItemIndex].quantity) - 1);

                        if (parseInt(newQuantity) > 0) {
                            updatedCartItems[existingCartItemIndex] = {
                                ...updatedCartItems[existingCartItemIndex],
                                quantity: newQuantity
                            };
                        } else {
                            updatedCartItems.splice(existingCartItemIndex, 1);
                        }

                        return {
                            ...prevCartItems,
                            [hotelName]: updatedCartItems
                        };
                    }

                    return prevCartItems;  // If item is not found, return the current state
                });
            }
        }
    }
};
