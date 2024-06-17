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
                        style={{ borderWidth: 2, borderColor: Colors.dark.colors.secComponentColor}}
                    >
                        {/* <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
                            className='overflow-hidden h-full w-full'
                            colors={['transparent', Colors.dark.colors.backGroundColor]}
                        >
                        </LinearGradient> */}
                    </ImageBackground>
                    <View
                        style={[styles.button, { backgroundColor: Colors.dark.colors.secComponentColor, borderColor: Colors.dark.colors.textColor, borderWidth: 1 }]}
                        className=' absolute left-[18%] w-[74%] -bottom-2 h-9 flex-row overflow-hidden'
                    >
                        {item.quantity > 0 ? (
                            <>
                                <TouchableOpacity onPress={() => handleDecrement(item.id, title)} className='z-10 left-0 absolute w-6/12 items-center'>
                                    <Ionicons color={Colors.dark.colors.textColor} name={'remove'} size={22} />
                                </TouchableOpacity>
                                <Text className=' uppercase text-xl font-black text-center' style={{ color: Colors.dark.colors.textColor }}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => handleIncrement(item.id, title)} className='z-10 right-0 absolute w-6/12 items-center'>
                                    <Ionicons color={Colors.dark.colors.textColor} name={'add'} size={22} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.colors.secComponentColor }]} onPress={() => handleIncrement(item.id, title)}>
                                    <Text className=' uppercase text-xl font-black' style={{ color: Colors.dark.colors.textColor }}>Add</Text>

                                </TouchableOpacity>
                                <Text className=' top-0 right-2 absolute text-xl font-medium' style={{ color: Colors.dark.colors.textColor }}>+</Text>
                            </>
                        )}
                    </View>
                </View>
                {renderModal({ data: selectedItemData })}
            </View>
            <Text style={{color: Colors.dark.colors.textColor}}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
        </>
    );

    const renderDropdown = (menu) => (
        <View key={menu.title}>
            <TouchableOpacity className=' border-b-2 border-zinc-100 flex-row items-center justify-between p-3' style={[{ backgroundColor: Colors.dark.colors.componentColor}]} onPress={() => toggleDropdown(menu.title)}>
                <Text className=' text-2xl font-black' style={[{ color: Colors.dark.colors.diffrentColorOrange }]}>{menu.title}</Text>
                <Ionicons color={Colors.dark.colors.diffrentColorOrange} name={openDropdowns[menu.title] ? "caret-up-outline" : "caret-down-outline"} size={24} />
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
        <ScrollView
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.container}>
                {menuItems.map(menu => renderDropdown(menu))}
            </View>
        </ScrollView>
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
