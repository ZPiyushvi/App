import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import PopUp from '../Components/PopUp';

const DetailsScreen = ({ route }) => {
    const { data } = route.params || {};
    const [menuItems, setMenuItems] = useState(data.menu);
    const { CartItems, setCartItems, setQuantity, quantity } = useContext(GlobalStateContext);

    const [openDropdowns, setOpenDropdowns] = useState({});
    const { Openmodal, setOpenmodal, renderModal } = PopUp();

    const [selectedItemData, setSelectedItemData] = useState();

    const handleIncrement = (id, title) => {
        setMenuItems(prevItems =>
            prevItems.map(menu =>
                menu.title === title
                    ? {
                        ...menu,
                        items: menu.items.map(item =>
                            item.id === id
                                ? { ...item, quantity: String(parseInt(item.quantity) + 1) }
                                : item
                        ),
                    }
                    : menu
            )
        );
    };

    const handleDecrement = (id, title) => {
        setMenuItems(prevItems =>
            prevItems.map(menu =>
                menu.title === title
                    ? {
                        ...menu,
                        items: menu.items.map(item =>
                            item.id === id
                                ? { ...item, quantity: item.quantity > 0 ? String(parseInt(item.quantity) - 1) : '0' }
                                : item
                        ),
                    }
                    : menu
            )
        );
    };

    const handleAddToCart = () => {
        const cartItems = menuItems.flatMap(menu => menu.items.filter(item => item.quantity > 0));
        alert(`Added to cart: ${cartItems.map(item => `${item.quantity} of ${item.item}`).join(', ')}`);
    };

    const toggleDropdown = (title) => {
        setOpenDropdowns(prevState => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    };


    const renderDropdownItem_2 = ({ item, title }) => (
        // const [Amunt, setAmunt] = useState(0);
        <View
            className=' flex-row justify-between items-center'
            style={{ backgroundColor: 'fuchsia', padding: 30 }}
        >
            <TouchableOpacity
                onPress={() => { setOpenmodal(true)}}
            >
                <Text>{item.item} - ₹{item.price}</Text>
                <Text>{item.quantity}</Text>
                {item.size && item.size.length > 0 && (
                    item.size[0] === "noncountable" ? (
                        <RenderInputText />
                    ) : item.size[0] === "countable" ? (
                        <View className='searchBodyContainer mt-5 flex-row justify-between' style={{ marginHorizontal: Dimensions.get('window').width * 0.03 }}>
                            {item.size.map((size, index) => {
                                if (index >= 1) { // Start rendering from the second index
                                    return (
                                        <TouchableOpacity key={index}>
                                            <Text
                                                className='searchIcon'
                                                style={{
                                                    color: Colors.dark.colors.diffrentColorOrange,
                                                    backgroundColor: Colors.dark.colors.secComponentColor,
                                                    borderRadius: 15,
                                                    width: 50,
                                                    height: 50,
                                                    textAlign: 'center',
                                                    textAlignVertical: 'center',
                                                }}
                                            >
                                                {size}
                                                {/* {console.log(size)} */}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }
                            })}
                        </View>
                    ) : null
                )}
            </TouchableOpacity>
            <View>
                <Image
                    source={{
                        uri: item.image,
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache',
                        },
                    }}
                    className=' bg-black w-36 h-36 border-2 border-slate-950'
                    style={{ borderWidth: 2, borderColor: 'black', borderRadius: 8 }}
                    alt="Logo"
                />
                <View
                    style={styles.button}
                    className=' absolute top-32 left-4 w-28 h-9 flex-row overflow-hidden'
                >
                    {/* <Text style={styles.buttonTxt}>Add to Cart</Text> */}
                    {item.quantity ? (
                        <>
                            <TouchableOpacity className='z-10 left-0 absolute w-6/12 p-3' onPress={handleDecrement(item.id, title)}>
                                <Text style={styles.buttonTxt}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.buttonTxt}>{item.quantity}</Text>
                            <TouchableOpacity className=' right-0 absolute w-5/12 p-3' onPress={handleIncrement(item.id, title)}>
                                <Text style={styles.buttonTxt}>+</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity className='w-full h-full justify-center items-center' onPress={() => { handleDecrement(item.id, title) }}>
                            <Text style={styles.buttonTxt}>Add to Cart</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </View>

        </View>
    );



    const renderDropdownItem = ({ item, title }) => (
        <View
            className=' flex-row justify-between items-center p-3 pb-7'
            style={{ backgroundColor: 'fuchsia', }}
        >
            <TouchableOpacity
                className='w-7/12 h-full'
                onPress={() => { setOpenmodal(true), setSelectedItemData(item)}}
            >
                <Text style={styles.itemText}>{item.item}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <Text style={styles.priceText}>Price: {item.price}</Text>
                {item.size && item.size.length > 0 && (
                    item.size[0] === "noncountable" ? (
                        <RenderInputText />
                    ) : item.size[0] === "countable" ? (
                        <View className='searchBodyContainer mt-5 flex-row justify-between' style={{ marginHorizontal: Dimensions.get('window').width * 0.03 }}>
                            {item.size.map((size, index) => {
                                if (index >= 1) {
                                    return (
                                        <TouchableOpacity key={index}>
                                            <Text
                                                className='searchIcon'
                                                style={{
                                                    color: Colors.dark.colors.diffrentColorOrange,
                                                    backgroundColor: Colors.dark.colors.secComponentColor,
                                                    borderRadius: 15,
                                                    width: 50,
                                                    height: 50,
                                                    textAlign: 'center',
                                                    textAlignVertical: 'center',
                                                }}
                                            >
                                                {size}
                                                {/* {console.log(size)} */}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }
                            })}
                        </View>
                    ) : null
                )}
            </TouchableOpacity>
            <View className='w-5/12'>
                <Image
                    source={{
                        uri: item.image,
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache',
                        },
                    }}
                    className=' bg-black w-full h-36 border-2 border-slate-950'
                    style={{ borderWidth: 2, borderColor: 'black', borderRadius: 8 }}
                    alt="Logo"
                />
                <View
                    style={styles.button}
                    className=' absolute top-32 left-[10%] w-[80%] h-9 flex-row overflow-hidden'
                >
                    {/* <Text style={styles.buttonTxt}>Add to Cart</Text> */}
                    {item.quantity > 0 ? (
                        <>
                            <TouchableOpacity onPress={() => handleDecrement(item.id, title)} className='z-10 left-0 absolute w-6/12 p-3'>
                                <Text style={styles.buttonTxt}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.buttonTxt}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => handleIncrement(item.id, title)} className=' right-0 absolute w-5/12 p-3'>
                                <Text style={styles.buttonTxt}>+</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={() => handleIncrement(item.id, title)}>
                            <Text style={styles.buttonTxt}>Add to Cart</Text>
                        </TouchableOpacity>
                    )}

                    {/* {quantity ? (
                            <>
                                <TouchableOpacity className='z-10 left-0 absolute w-6/12 p-3' onPress={handleDecrement}>
                                    <Text style={styles.buttonTxt}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.buttonTxt}>{quantity}</Text>
                                <TouchableOpacity className=' right-0 absolute w-5/12 p-3' onPress={handleIncrement}>
                                    <Text style={styles.buttonTxt}>+</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity className='w-full h-full justify-center items-center' onPress={() => { handleIncrement(), renderAddToCart({ data: item, amount: quantity}) }}>
                                <Text style={styles.buttonTxt}>Add to Cart</Text>
                            </TouchableOpacity>
                        )} */}
                </View>
            </View>
            {/* {console.log(selectedItemData)} */}
            {renderModal({ data: selectedItemData })}
        </View>

        // <View
        //     className=' flex-row justify-between items-center'
        //     style={{ backgroundColor: 'fuchsia', padding: 30 }}
        // >
        //     <TouchableOpacity
        //         onPress={() => { setOpenmodal(true), setSelectedItemData(item) }}
        //     >
        //         <View style={styles.detailsContainer}>
        //             <Text style={styles.itemText}>{item.item}</Text>
        //             <Text style={styles.descriptionText}>{item.description}</Text>
        //             <Text style={styles.priceText}>Price: {item.price}</Text>
        //             <View style={styles.quantityContainer}>
        //             </View>
        //         </View>
        //     </TouchableOpacity>
        //     {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
        // </View>
    );

    const renderDropdown = (menu) => (
        <View key={menu.title}>
            <TouchableOpacity style={styles.dropdownHeader} onPress={() => toggleDropdown(menu.title)}>
                <Text style={styles.dropdownHeaderText}>{menu.title}</Text>
                <Ionicons name={openDropdowns[menu.title] ? "caret-up-outline" : "caret-down-outline"} size={24} />
            </TouchableOpacity>
            {openDropdowns[menu.title] && (
                <FlatList
                    data={menu.items}
                    renderItem={({ item }) => renderDropdownItem({ item, title: menu.title })}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {menuItems.map(menu => renderDropdown(menu))}
            <Button title="Add to Cart" onPress={handleAddToCart} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonTxt: {
        color: '#F7F6BB',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 16,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
    },
    priceText: {
        fontSize: 16,
        color: '#333',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    button: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 8, // Adjust padding instead of fixed height
        // paddingHorizontal: 10, // Add padding for horizontal space
        backgroundColor: '#114232',
    },
    buttonText: {
        fontSize: 18,
    },
    quantityText: {
        marginHorizontal: 16,
        fontSize: 18,
    },
    dropdownContainer: {
        marginBottom: 16,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    dropdownHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DetailsScreen;
