import { useContext, useState, useCallback } from "react";
import { GlobalStateContext } from "../Context/GlobalStateContext";

const useIncrementHandler = (menu) => {
    // const { CartItems, setCartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
    const [menuItems, setMenuItems] = useState(menu);
    const [cartItems, setCartItems] = useState([]);

    const handleIncrement = useCallback((id, title, itemName, hotelName) => {
        setCartItems((prevCartItems) => {
            // Check if the hotel already exists in the cart
            const hotelIndex = prevCartItems.findIndex(
                (hotel) => hotel.name === hotelName
            );

            if (hotelIndex !== -1) {
                // Hotel exists, check if the item already exists in the hotel's orders
                const hotel = prevCartItems[hotelIndex];
                const itemIndex = hotel.orders.findIndex(
                    (order) => order.item === itemName
                );

                if (itemIndex !== -1) {
                    // Item exists, increment quantity
                    const updatedOrders = hotel.orders.map((order, index) =>
                        index === itemIndex
                            ? { ...order, quantity: order.quantity + 1 }
                            : order
                    );

                    const updatedHotel = { ...hotel, orders: updatedOrders };

                    return [
                        ...prevCartItems.slice(0, hotelIndex),
                        updatedHotel,
                        ...prevCartItems.slice(hotelIndex + 1),
                    ];
                } else {
                    // Item doesn't exist, add it
                    const updatedOrders = [
                        ...hotel.orders,
                        { item: itemName, quantity: 1 },
                    ];

                    const updatedHotel = { ...hotel, orders: updatedOrders };

                    return [
                        ...prevCartItems.slice(0, hotelIndex),
                        updatedHotel,
                        ...prevCartItems.slice(hotelIndex + 1),
                    ];
                }
            } else {
                // Hotel doesn't exist, add it with the item
                const newHotel = {
                    name: hotelName,
                    orders: [{ item: itemName, quantity: 1 }],
                };

                return [...prevCartItems, newHotel];
            }
        })
        // const updatedMenuItems = [...menuItems];
        // const categoryIndex = updatedMenuItems.findIndex(category => category.title === title);

        // if (categoryIndex !== -1) {
        //     const itemIndex = updatedMenuItems[categoryIndex].items.findIndex(item => item.id === id);

        //     if (itemIndex !== -1) {
        //         updatedMenuItems[categoryIndex].items[itemIndex] = {
        //             ...updatedMenuItems[categoryIndex].items[itemIndex],
        //             quantity: String(parseInt(updatedMenuItems[categoryIndex].items[itemIndex].quantity) + 1)
        //         };

        //         setMenuItems(updatedMenuItems);

        //         setCartItems(prevCartItems => {
        //             const hotelCart = prevCartItems[hotelName] || [];
        //             const existingCartItemIndex = hotelCart.findIndex(item => item.item === itemName);

        //             if (existingCartItemIndex !== -1) {
        //                 hotelCart[existingCartItemIndex] = {
        //                     ...hotelCart[existingCartItemIndex],
        //                     quantity: String(parseInt(hotelCart[existingCartItemIndex].quantity) + 1)
        //                 };
        //             } else {
        //                 const menuItemToAdd = updatedMenuItems[categoryIndex].items[itemIndex];
        //                 menuItemToAdd.quantity = "1";
        //                 hotelCart.push(menuItemToAdd);
        //             }

        //             return {
        //                 ...prevCartItems,
        //                 [hotelName]: hotelCart
        //             }
        //         })
        //     }
        // }
        console.log(cartItems)
    }, []); //menuItems, setCartItems

    const handleDecrement = useCallback((id, title, itemName, hotelName) => {
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
    }, [menuItems, setCartItems]);
    // const handleIncrement = useCallback((id, title, itemName, hotelName) => {
    //     const updatedMenuItems = [...menuItems];
    //     const categoryIndex = updatedMenuItems.findIndex(category => category.title === title);

    //     if (categoryIndex !== -1) {
    //         const itemIndex = updatedMenuItems[categoryIndex].items.findIndex(item => item.id === id);

    //         if (itemIndex !== -1) {
    //             updatedMenuItems[categoryIndex].items[itemIndex] = {
    //                 ...updatedMenuItems[categoryIndex].items[itemIndex],
    //                 quantity: String(parseInt(updatedMenuItems[categoryIndex].items[itemIndex].quantity) + 1)
    //             };

    //             setMenuItems(updatedMenuItems);

    //             setCartItems(prevCartItems => {
    //                 const hotelCart = prevCartItems[hotelName] || [];
    //                 const existingCartItemIndex = hotelCart.findIndex(item => item.item === itemName);

    //                 if (existingCartItemIndex !== -1) {
    //                     hotelCart[existingCartItemIndex] = {
    //                         ...hotelCart[existingCartItemIndex],
    //                         quantity: String(parseInt(hotelCart[existingCartItemIndex].quantity) + 1)
    //                     };
    //                 } else {
    //                     const menuItemToAdd = updatedMenuItems[categoryIndex].items[itemIndex];
    //                     menuItemToAdd.quantity = "1";
    //                     hotelCart.push(menuItemToAdd);
    //                 }

    //                 return {
    //                     ...prevCartItems,
    //                     [hotelName]: hotelCart
    //                 }
    //             });
    //         }
    //     }
    // }, [menuItems, setCartItems]);

    return {
        menuItems,
        handleIncrement,
        handleDecrement
    };
};

export default useIncrementHandler;





// Privious Handles from Detials Screen

// const handleIncrement = (id, title, itemName, hotelName) => {
//     const updatedMenuItems = [...menuItems];
//     const categoryIndex = updatedMenuItems.findIndex(category => category.title === title);

//     if (categoryIndex !== -1) {
//         const itemIndex = updatedMenuItems[categoryIndex].items.findIndex(item => item.id === id);

//         if (itemIndex !== -1) {
//             updatedMenuItems[categoryIndex].items[itemIndex] = {
//                 ...updatedMenuItems[categoryIndex].items[itemIndex],
//                 quantity: String(parseInt(updatedMenuItems[categoryIndex].items[itemIndex].quantity) + 1)
//             };

//             setMenuItems(updatedMenuItems);

//             setCartItems(prevCartItems => {
//                 const hotelCart = prevCartItems[hotelName] || [];
//                 const existingCartItemIndex = hotelCart.findIndex(item => item.item === itemName);

//                 if (existingCartItemIndex !== -1) {
//                     hotelCart[existingCartItemIndex] = {
//                         ...hotelCart[existingCartItemIndex],
//                         quantity: String(parseInt(hotelCart[existingCartItemIndex].quantity) + 1)
//                     };
//                 } else {
//                     const menuItemToAdd = updatedMenuItems[categoryIndex].items[itemIndex];
//                     menuItemToAdd.quantity = "1";
//                     hotelCart.push(menuItemToAdd);
//                 }

//                 return {
//                     ...prevCartItems,
//                     [hotelName]: hotelCart
//                 }
//             })
//         }
//     }
// }

// const handleDecrement = (id, title, itemName, hotelName) => {
//     const updatedMenuItems = [...menuItems];
//     const categoryIndex = updatedMenuItems.findIndex(category => category.title === title);

//     if (categoryIndex !== -1) {
//         const itemIndex = updatedMenuItems[categoryIndex].items.findIndex(item => item.id === id);

//         if (itemIndex !== -1) {
//             if (parseInt(updatedMenuItems[categoryIndex].items[itemIndex].quantity) > 0) {
//                 updatedMenuItems[categoryIndex].items[itemIndex] = {
//                     ...updatedMenuItems[categoryIndex].items[itemIndex],
//                     quantity: String(parseInt(updatedMenuItems[categoryIndex].items[itemIndex].quantity) - 1)
//                 };

//                 setMenuItems(updatedMenuItems);

//                 setCartItems(prevCartItems => {
//                     const hotelCart = prevCartItems[hotelName] || [];
//                     const existingCartItemIndex = hotelCart.findIndex(item => item.item === itemName);

//                     if (existingCartItemIndex !== -1) {
//                         const updatedCartItems = [...hotelCart];
//                         const newQuantity = String(parseInt(updatedCartItems[existingCartItemIndex].quantity) - 1);

//                         if (parseInt(newQuantity) > 0) {
//                             updatedCartItems[existingCartItemIndex] = {
//                                 ...updatedCartItems[existingCartItemIndex],
//                                 quantity: newQuantity
//                             };
//                         } else {
//                             updatedCartItems.splice(existingCartItemIndex, 1);
//                         }

//                         return {
//                             ...prevCartItems,
//                             [hotelName]: updatedCartItems
//                         };
//                     }

//                     return prevCartItems;  // If item is not found, return the current state
//                 });
//             }
//         }
//     }
// };

