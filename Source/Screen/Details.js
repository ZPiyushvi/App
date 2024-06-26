import React, { useCallback, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Dimensions, ImageBackground, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import PopUp from '../Components/PopUp';
import FoodIcon from '../Components/FoodIcon';
import FoodTypeIcon from '../Components/FoodTypeIcon';
import Colors from '../Components/Colors';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import LongStarIcon from '../Components/LongStarIcon';
import { LinearGradient } from 'expo-linear-gradient';
import useShopStatus from '../Components/useShopStatus';
import { useNavigation } from '@react-navigation/native';
import ModelScreen from './ModelScreen';

const DetailsScreen = ({ route }) => {

    // const [visible, setVisible] = useState(false);
    // const show = () => setVisible(true);
    // const hide = () => setVisible(false);
    const { show, hide, RenderModel } = ModelScreen();

    const { Data } = route.params || {};
    const [menuItems, setMenuItems] = useState(Data.menu);
    const { CartItems, setCartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
    const Shopstatus = useShopStatus(Data.openingtime, Data.closingtime, Data.offdays, Data.leaveDay);
    // const [HotelCartItems, setHotelCartItems] = useState([{hotelname}]);
    // menuItems.forEach((item) => console.log(item))

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

    const handleIncrement = useCallback((id, title, itemName, hotelName) => {
        setMenuItems(prevMenuItems => {
            const updatedMenuItems = [...prevMenuItems];
            const categoryIndex = updatedMenuItems.findIndex(category => category.title === title);
    
            if (categoryIndex !== -1) {
                const category = updatedMenuItems[categoryIndex];
                const itemIndex = category.items.findIndex(item => item.id === id);
    
                if (itemIndex !== -1) {
                    const item = category.items[itemIndex];
                    category.items[itemIndex] = {
                        ...item,
                        quantity: String(parseInt(item.quantity) + 1)
                    };
                    console.log(category.items[itemIndex]);
    
                    // Update the cart items
                    setCartItems(prevCartItems => {
                        const updatedCartItems = { ...prevCartItems };
                        if (!updatedCartItems[hotelName]) {
                            // Hotel does not exist in the cart, add it
                            updatedCartItems[hotelName] = [category.items[itemIndex]];
                        } else {
                            // Hotel exists, check for the item
                            const hotelCart = [...updatedCartItems[hotelName]];
                            const existingCartItemIndex = hotelCart.findIndex(cartItem => cartItem.id === id);
    
                            if (existingCartItemIndex !== -1) {
                                hotelCart[existingCartItemIndex] = {
                                    ...hotelCart[existingCartItemIndex],
                                    quantity: String(parseInt(hotelCart[existingCartItemIndex].quantity) + 1)
                                };
                            } else {
                                hotelCart.push(category.items[itemIndex]);
                            }
                            updatedCartItems[hotelName] = hotelCart;
                        }
                        return updatedCartItems;
                    });
                }
            }
            return updatedMenuItems;
        });
    }, [setCartItems, setMenuItems]);

    const handleDecrement = (id, title, itemName, hotelName) => {
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
                                {/* {console.log(item)} */}
                                <TouchableOpacity onPress={() => { handleDecrement(item.id, title, item.item, Data.name) }} className='z-10 left-0 absolute w-6/12 items-center'>
                                    <Ionicons color={Colors.dark.colors.textColor} name={'remove'} size={22} />
                                </TouchableOpacity>
                                <Text className=' uppercase text-xl font-black text-center' style={{ color: Colors.dark.colors.diffrentColorGreen }}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => { handleIncrement(item.id, title, item.item, Data.name) }} className='z-10 right-0 absolute w-6/12 items-center'>
                                    <Ionicons color={Colors.dark.colors.textColor} name={'add'} size={22} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.colors.componentColor }]} onPress={() => { handleIncrement(item.id, title, item.item, Data.name) }}>
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
                // style={{ padding: 12 }}
                className=' px-4 py-4'
                onPress={() => setSelectedIndex(index)} // Update the selected index on press
            >
                <Text
                    style={{
                        // fontWeight: 'bold',
                        // fontSize: 21,
                        color: isSelected ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.textColor
                    }}
                    className='text-base font-semibold'
                >
                    {typetitle}
                </Text>
            </TouchableOpacity>
        );
    }

    const renderDropdown = (menu) => (
        <View className='gap-3' key={menu.title}>
            <TouchableOpacity className=' mb-6 border-b-2 flex-row items-center justify-between p-3' style={[{ borderColor: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.secComponentColor }]} onPress={() => toggleDropdown(menu.title)}>
                <Text className=' text-xl font-black' style={[{ color: Colors.dark.colors.mainTextColor }]}>{menu.title}</Text>
                <Ionicons color={Colors.dark.colors.mainTextColor} name={openDropdowns[menu.title] ? "caret-up-outline" : "caret-down-outline"} size={20} />
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

    const getShopImageSource = (state) => {
        switch (state) {
            case 'closed':
                return require('./../Data/closed.png');
            //   case 'closedForMaintenance':
            //     return require('./../Data/closedMaintenance.png');
            //   case 'open':
            //     return require('./../Data/opened.png');
            //   case 'openingSoon':
            //     return require('./../Data/openingSoon.png');
            case 'closingSoon':
                return require('./../Data/closingsoon.png');
            default:
                return null; // Or a default image
        }
    };

    const navigation = useNavigation();

    return (
        <View key={CartItems.storeName}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{ backgroundColor: Colors.dark.colors.backGroundColor }}
            >
                {/* <View style={{backgroundColor: Shopstatus.color, borderBottomRightRadius: 30, borderBottomLeftRadius: 30}} className='overflow-hidden mb-10 p-5 items-center justify-center'> */}
                <LinearGradient colors={[Colors.dark.colors.backGroundColor, Shopstatus.color]}
                    // start={{ x: 0.0, y: 0.2 }} end={{ x: 0.0, y: 1.8 }}
                    className='overflow-hidden mb-10 p-5 items-center justify-center' style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <View className=' items-center mb-6 gap-4'>
                        <Image
                            source={getShopImageSource(Shopstatus.state)}
                            className='w-44 h-16'
                            alt="Logo"
                        />
                        <Text className=' font-semibold text-base text-center' style={{ color: Colors.dark.colors.mainTextColor }}>
                            {Shopstatus.text}
                        </Text>
                    </View>
                    <View className=' w-full rounded-3xl items-center justify-center p-3' style={{ backgroundColor: Colors.dark.colors.componentColor, }}>
                        {/* <View className=' w-44 h-24 mb-6'>
                        <Image
                            source={require("./../Data/Offline.png")}
                            className=' w-full h-full'
                            alt="Logo"
                        />
                        </View> */}
                        <Text className=' text-3xl font-black mb-1' style={{ color: Colors.dark.colors.mainTextColor }}>{Data.name}</Text>
                        <View className='flex-row gap-2 justify-center items-center mb-3'>
                            <View className='flex-row justify-center items-center'>
                                {Data.type === "Veg" && <Ionicons name="leaf" size={18} color={Colors.dark.colors.diffrentColorGreen} />}
                                <Text className='font-semibold text-base' style={{ color: Colors.dark.colors.textColor }}>{Data.type}</Text>
                            </View>
                            <Ionicons name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                            <Text className='font-semibold text-base' style={{ color: Colors.dark.colors.textColor }}>{Data.menutype}</Text>
                        </View>

                        <View className='flex-row justify-center items-center gap-1 mb-3'>
                            <View className=' flex-row justify-center items-center rounded-lg px-1 bg-green-500' style={{ paddingVertical: 2 }}>
                                <Text className='font-semibold text-lg mr-1 text-white' >{Data.rating}</Text>
                                <Ionicons name="star" color={'white'} />
                            </View>
                            <Text className='font-semibold text-base' style={{ color: Colors.dark.colors.mainTextColor, textDecorationLine: 'underline', textDecorationStyle: 'dotted' }}> {Data.ratingcount} ratings</Text>
                        </View>
                        <View className='flex-row justify-center items-center bg-slate-300 rounded-full py-1 px-1'>
                            <Ionicons name="navigate-circle" size={24} color={'red'} />
                            <Text className='font-semibold text-base mx-1'>{Data.locationdetailed}</Text>
                        </View>
                    </View>
                    {/* </View> */}
                </LinearGradient>

                <View className=' flex-row justify-between p-4'>
                    <View className=' flex-row gap-3'>
                        <View className='flex-row border-2 justify-center items-center rounded-full py-1 px-3' style={{ borderColor: Colors.dark.colors.textColor }}>
                            <View className=' absolute z-10 left-3'>
                                <FoodIcon style={{ backgroundColor: 'black' }} type={'Veg'} size={11} padding={2} />
                            </View>
                            <View className='h-2 w-11 rounded-full' style={{ backgroundColor: Colors.dark.colors.textColor }} />
                        </View>
                        <View className='flex-row border-2 justify-center items-center rounded-full py-1 px-3' style={{ borderColor: Colors.dark.colors.textColor }}>
                            <View className=' absolute z-10 left-3'>
                                <FoodIcon style={{ backgroundColor: 'black' }} type={'NonVeg'} size={11} padding={2} />
                            </View>
                            <View className='h-2 w-11 rounded-full' style={{ backgroundColor: Colors.dark.colors.textColor }} />
                        </View>
                    </View>
                    <View className='flex-row border-2 justify-center items-center rounded-full py-1 px-3' style={{ borderColor: Colors.dark.colors.textColor }}>
                        <Text className='font-semibold text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Filter </Text>
                        <Ionicons name="barcode-outline" size={24} color={Colors.dark.colors.mainTextColor} />
                    </View>
                </View>


                <View style={styles.container}>
                    {menuItems.map(menu => renderDropdown(menu))}
                </View>

                <View className='p-3 pb-24 gap-y-10'>
                    <View className=' gap-3'>
                        <Text className='font-medium text-base' style={{ color: Colors.dark.colors.textColor }}>
                            Be mindful of portion sizes, especially when dining out, as restaurant portions are often larger than necessary.
                        </Text>
                        <Text className='font-medium text-base' style={{ color: Colors.dark.colors.textColor }}>
                            Not all fats are bad. Omega-3 fatty acids, found in fish, flaxseeds, and walnuts, are beneficial for heart health.
                        </Text>
                        <Text className='font-medium text-base' style={{ color: Colors.dark.colors.textColor }}>
                            The average adult needs about 8 cups (2 liters) of water per day, but individual needs may vary based on activity level, climate, and overall health.
                        </Text>
                        <Text className='font-medium text-base' style={{ color: Colors.dark.colors.textColor }}>
                            An average active adult requires 2,000 kcal of energy per day; however, calorie needs may vary.
                        </Text>
                    </View>
                    <TouchableOpacity className='flex-row justify-between items-center' onPress={show}>
                        <View className='flex-row items-center'>
                            <Ionicons color={'red'} name={'alert-circle-outline'} size={22} />
                            <Text className='font-black text-lg' style={{ color: 'red' }}> Report an issue with the menu</Text>
                        </View>
                        <Ionicons color={'red'} name={'caret-forward-outline'} size={22} />
                    </TouchableOpacity>
                    <View>
                        <Image
                            source={require("./../Data/fssai.png")}
                            className=' w-14 h-11'
                            alt="Logo"
                        />
                        <Text className='font-semibold text-base' style={{ color: Colors.dark.colors.textColor }}>Lic. No. 11521055001181</Text>
                    </View>
                </View>

            </ScrollView>

            {/* MenuScrollView */}

            <View className='absolute bottom-0 w-full'>
                <View className='w-full bottom-0 border-t-2 flex-row items-center justify-between' style={[{ borderColor: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.componentColor }]}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {Data.menu.map((menu, index) => (
                            renderMenuScroll({ typetitle: menu.title, index: index })
                        ))}
                    </ScrollView>
                </View>
                {updatedCartWithDetails.map(({ storeName, storeDetails, items, totalPrice }, index) => (
                    storeName === Data.name ? (

                        <TouchableOpacity onPress={() => navigation.navigate('IndiviualCart', { storeName, items, totalPrice, storeDetails })}>
                            <View className=' flex-row items-center justify-between p-4' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} key={index}>
                                <Text className='font-semibold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>
                                    {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0)} {''}
                                    {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0) === 1 ? 'item' : 'items'} added
                                </Text>
                                <View className=' flex-row items-center'>
                                    <Text className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>CheckOut </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('IndiviualCart', { storeName, items, totalPrice, storeDetails })}>
                                        <Ionicons color={Colors.dark.colors.mainTextColor} name={'caret-forward-circle'} size={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : null
                ))}
            </View>
            {RenderModel()}
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
