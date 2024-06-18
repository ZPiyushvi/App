import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import PopUp from '../Components/PopUp';
import FoodIcon from '../Components/FoodIcon';
import FoodTypeIcon from '../Components/FoodTypeIcon';
import Colors from '../Components/Colors';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import LongStarIcon from '../Components/LongStarIcon';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsScreen = ({ route }) => {
    const { data } = route.params || {};
    const [menuItems, setMenuItems] = useState(data.menu);
    const { CartItems, setCartItems, setQuantity, quantity } = useContext(GlobalStateContext);

    const [openDropdowns, setOpenDropdowns] = useState(() => {
        const initialDropdowns = {};
        // Initialize all dropdowns to be open
        menuItems.forEach(menu => {
            initialDropdowns[menu.title] = true;
        });
        return initialDropdowns;
    });

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

    const renderDropdownItem = ({ item, title }) => (
        <>
            <View
                className=' flex-row justify-between items-center p-3 pb-6'
            >
                <TouchableOpacity
                    className='w-6/12 h-full'
                    onPress={() => { setOpenmodal(true), setSelectedItemData(item) }}
                >
                    <View className='flex-row'>
                        {
                            item.type &&
                            <FoodIcon style={{ backgroundColor: 'black' }} type={item.type} size={11} padding={2} />
                        }
                        {
                            item.category.split('_').map((part, index) => (
                                <FoodTypeIcon key={index} type={part} size={15} padding={3} textShow={false} />
                            ))
                        }
                    </View>
                    <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>
                        {TruncatedTextComponent(item.item, 30)}
                    </Text>

                    <Text className='text-base font-semibold' style={{ color: Colors.dark.colors.mainTextColor }}>₹{item.price}</Text>
                    <View className=' flex-row py-2'>
                        <LongStarIcon rating={item.rating} ratingcount={item.ratingcount} />
                        <Text className='text font-medium' style={{ color: Colors.dark.colors.mainTextColor }}>  {item.ratingcount} ratings</Text>
                    </View>

                    <Text style={styles.descriptionText}>{TruncatedTextComponent(item.longdescription, 67, true)}</Text>
                </TouchableOpacity>
                <View className='w-6/12 p-2'>
                    <ImageBackground
                        source={{
                            uri: item.image,
                            method: 'POST',
                            headers: {
                                Pragma: 'no-cache',
                            },
                        }}
                        alt="Logo"
                        className='rounded-3xl w-full h-36 border-2 overflow-hidden border-slate-950'
                        style={{ borderWidth: 2, borderColor: Colors.dark.colors.secComponentColor }}
                    >
                        {/* <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
                            className='overflow-hidden h-full w-full'
                            colors={['transparent', Colors.dark.colors.backGroundColor]}
                        >
                        </LinearGradient> */}
                    </ImageBackground>
                    <View
                        style={[styles.button, { backgroundColor: Colors.dark.colors.componentColor, borderColor: Colors.dark.colors.textColor, borderWidth: 1 }]}
                        className=' absolute left-[18%] w-[74%] -bottom-2 h-9 flex-row overflow-hidden'
                    >
                        {item.quantity > 0 ? (
                            <>
                                <TouchableOpacity onPress={() => handleDecrement(item.id, title)} className='z-10 left-0 absolute w-6/12 items-center'>
                                    <Ionicons color={Colors.dark.colors.textColor} name={'remove'} size={22} />
                                </TouchableOpacity>
                                <Text className=' uppercase text-xl font-black text-center' style={{ color: Colors.dark.colors.diffrentColorGreen }}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => handleIncrement(item.id, title)} className='z-10 right-0 absolute w-6/12 items-center'>
                                    <Ionicons color={Colors.dark.colors.textColor} name={'add'} size={22} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.colors.componentColor }]} onPress={() => handleIncrement(item.id, title)}>
                                    <Text className=' uppercase text-xl font-black' style={{ color: Colors.dark.colors.diffrentColorGreen }}>Add</Text>

                                </TouchableOpacity>
                                <Text className=' top-0 right-2 absolute text-xl font-medium' style={{ color: Colors.dark.colors.textColor }}>+</Text>
                            </>
                        )}
                    </View>
                </View>
                {renderModal({ data: selectedItemData })}
            </View>
            <Text style={{ color: Colors.dark.colors.textColor }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
        </>
    );

    const [selectedIndex, setSelectedIndex] = useState(null);
    const renderMenuScroll = ({ typetitle, index }) => {
        const isSelected = selectedIndex === index; // Check if the current item is selected

        return (
            <TouchableOpacity
                key={index}
                style={{ padding: 12 }}
                onPress={() => setSelectedIndex(index)} // Update the selected index on press
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: isSelected ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.textColor
                    }}
                >
                    {typetitle}
                </Text>
            </TouchableOpacity>
        );
    }

    const items = [
        { "id": "1", "rating": "4.5", "ratingcount": "314", "item": "Masala Chai", "price": "50", "description": "Traditional Indian spiced tea.", "type": "Veg", "category": "Hot_Cafe", "image": "https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-10-20_at_11.07.13_AM.png?v=1697780292", "quantity": "0", "longdescription": "Aromatic tea blended with a mixture of Indian spices such as cardamom, ginger, and cloves." },
        { "id": "2", "rating": "3.5", "ratingcount": "314", "item": "Cold Coffee", "price": "70", "description": "Refreshing cold coffee.", "type": "Veg", "category": "Cold_Cafe", "image": "https://www.funfoodfrolic.com/wp-content/uploads/2020/09/Cold-Coffee-Thumbnail.jpg", "quantity": "0", "longdescription": "Smooth coffee served chilled, often topped with cream or ice cream." },
        { "id": "3", "rating": "3.0", "ratingcount": "314", "item": "Cold Coco", "price": "60", "description": "Chilled chocolate-flavored drink.", "type": "Veg", "category": "Cold_Cafe", "image": "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/cre8krdqeeuyq74gbpsy", "quantity": "0", "longdescription": "Delicious cocoa drink served cold, perfect for chocolate lovers." },
        { "id": "4", "rating": "1.5", "ratingcount": "314", "item": "Iced Tea", "price": "65", "description": "Chilled tea served with ice.", "type": "Veg", "category": "Cold_Cafe", "image": "https://www.funfoodfrolic.com/wp-content/uploads/2017/05/Iced-Tea-3.jpg", "quantity": "0", "longdescription": "Refreshing iced tea with a hint of lemon, ideal for hot days." }
    ];

    const renderDropdown = (menu) => (
        <View className='gap-3' key={menu.title}>
            <TouchableOpacity className=' mb-6 border-b-2 flex-row items-center justify-between p-3' style={[{ borderColor: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.secComponentColor }]} onPress={() => toggleDropdown(menu.title)}>
                <Text className=' text-2xl font-black' style={[{ color: Colors.dark.colors.mainTextColor }]}>{menu.title}</Text>
                <Ionicons color={Colors.dark.colors.mainTextColor} name={openDropdowns[menu.title] ? "caret-up-outline" : "caret-down-outline"} size={24} />
            </TouchableOpacity>
            {openDropdowns[menu.title] && (
                <FlatList
                    data={menu.items}
                    renderItem={({ item }) => renderDropdownItem({ item, title: menu.title })}
                    keyExtractor={item => item.id}
                />
            )}
            {/* {renderDropdownItem({ items, title: 'Beverages' })} */}
        </View>
    );

    return (
        <>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{backgroundColor: Colors.dark.colors.backGroundColor}}
            >
                <View style={styles.container}>
                    {menuItems.map(menu => renderDropdown(menu))}
                </View>

            </ScrollView>

            {/* MenuScrollView */}

            <View className=' absolute w-full bottom-0 border-t-2 flex-row items-center justify-between p-2' style={[{ borderColor: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.componentColor }]}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {data.menu.map((menu, index) => (
                        renderMenuScroll({ typetitle: menu.title, index: index })
                    ))}
                </ScrollView>
            </View>
        </>
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
        // padding: 16,
        backgroundColor: Colors.dark.colors.backGroundColor,
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
        // backgroundColor: '#114232',
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
});

export default DetailsScreen;
