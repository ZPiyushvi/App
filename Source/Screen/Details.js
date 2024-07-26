import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Dimensions, ImageBackground, Modal, BackHandler, StatusBar } from 'react-native';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ModelScreen from './ModelScreen';

import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { loadingScreenTxt } from '../Data/loadingScreenTxt';
import useIncrementHandler, { handleIncrement } from '../Components/handleIncrement';
import { dropDown } from '../Components/dropDown';
import TextStyles from '../Style/TextStyles';
const ShimmerPlaceholder = createShimmerPlaceHolder(LinearGradient)

const DetailsScreen = ({ route }) => {
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('HomeScreen'); // Replace 'Home' with your home screen route name
                return true; // Prevent default behavior
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [navigation])
    );

    const [data, setData] = useState(null);

    useEffect(() => {
        // Show shimmer initially
        setVisible(false);
        // Simulate data fetch
        setTimeout(() => {
            setData(Data); // Replace with actual data fetch
            setVisible(true);
        }, 100); // Adjust timing as necessary
    }, [Data]);
    // console.log('data', data)

    const [visible, setVisible] = React.useState(false)
    const shimmerColors = [Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor, Colors.dark.colors.secComponentColor];

    // const show = () => setVisible(true);
    // const hide = () => setVisible(false);
    const { show, hide, RenderModel } = ModelScreen();

    const { Data } = route.params || {};
    const [menuItems, setMenuItems] = useState(Data.menu);
    // console.log(menuItems)
    const { cartItemsNEW, setCartItemsNEW, CartItems, setCartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
    const Shopstatus = useShopStatus(Data.openingtime, Data.closingtime, Data.offdays, Data.leaveDay);
    // const [HotelCartItems, setHotelCartItems] = useState([{hotelname}]);
    // menuItems.forEach((item) => console.log(item))

    const [openDropdowns, setOpenDropdowns] = useState(() => {
        const initialDropdowns = {};
        // Initialize all dropdowns to be open
        if (Array.isArray(menuItems)) {
            menuItems.forEach(menu => {
                initialDropdowns[menu.title] = true;
            })
        };
        // setVisible(true);
        return initialDropdowns;
    });

    // const { Openmodal, setOpenmodal, renderModal } = PopUp();

    const [selectedItemData, setSelectedItemData] = useState();
    const [vegBottom, setVegBottom] = useState(true);
    const [nonVegBottom, setNonVegBottom] = useState(true);

    if (vegBottom && nonVegBottom) {
        // Do not filter, show all items
        filteredMenuItems = menuItems;
    } else if (vegBottom) {
        // Show only veg items
        filteredMenuItems = menuItems.map(item => ({
            ...item,
            items: item.items.filter(shop => shop.type === "PureVeg")
        }));
    } else if (nonVegBottom) {
        // Show only non-veg items
        filteredMenuItems = menuItems.map(item => ({
            ...item,
            items: item.items.filter(shop => shop.type === "NonVeg")
        }));
    } else {
        // Show no items if both are false
        filteredMenuItems = [];
    }

    const handleVegBottom = () => {
        if (nonVegBottom && !vegBottom) {
            setNonVegBottom(!nonVegBottom)
            setVegBottom(!vegBottom)
            return
        }
        setVegBottom(!vegBottom)
    }

    const { handleIncrement } = useIncrementHandler();
    const { handleDecrement } = useIncrementHandler();
    const toggleDropdown = (title) => {
        setOpenDropdowns(prevState => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    };

    const numbers = [11, 10, 9, 8, 7];

    const getRandomNumber = () => {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        return numbers[randomIndex];
    };

    const getRandomNumberlodding = (data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    };


    const renderDropdownItem = ({ item, title }) => {
        const dataWithoutMenu = { ...Data };
        delete dataWithoutMenu.menu;
        return (
            <>
                {item.status ? null : <Text className=' absolute top-[40%] left-0 right-0 text-center' style={[fontstyles.h1, { fontSize: 70, marginTop: -30, color: Colors.dark.colors.diffrentColorRed }]}>SoldOut</Text>}
                <View
                    // style={{ backgroundColor: 'rgba(355, 355, 355, 0.)' }}
                    className={`flex-row p-3 ${item.status ? 'pb-6' : 'opacity-40'}`}
                >
                    <TouchableOpacity
                        className='w-6/12 h-full'
                        // activeOpacity={1}
                        onPress={() => { navigation.navigate('DetailView', { Data: item }) }}
                    >
                        <View className='flex-row'>
                            {
                                item.type &&
                                <FoodIcon style={{ backgroundColor: 'black' }} type={item.type} size={11} padding={2} />
                            }
                            {/* {
                                item.category.split('_').map((part, index) => (
                                    <FoodTypeIcon key={`${index}_${part}`} type={part} size={15} padding={3} textShow={false} />
                                ))
                            } */}
                        </View>
                        <Text numberOfLines={1} ellipsizeMode='middle' style={[fontstyles.blackh2, { color: Colors.dark.colors.diffrentColorOrange }]}>
                            {item.item}
                        </Text>

                        <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>₹{item.price}</Text>
                        <View className=' flex-row py-2'>
                            {item.rating &&
                                <LongStarIcon rating={item.rating} ratingcount={item.ratingcount} border={1} />}
                            <View className=' flex-row items-end'>
                                <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>  {item.ratingcount}</Text>
                                <Text style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}> ratings</Text>
                            </View>
                        </View>

                        <Text numberOfLines={3} ellipsizeMode='middle' style={styles.descriptionText}>{item.description}</Text>
                    </TouchableOpacity>
                    <View className='w-6/12 p-2'>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { navigation.navigate('DetailView', { Data: item }) }}
                        >
                            <ImageBackground
                                source={{
                                    uri: item.image,
                                    method: 'POST',
                                    headers: {
                                        Pragma: 'no-cache',
                                    },
                                }}
                                defaultSource={require('./../../assets/menu.jpg')}
                                resizeMode="cover"
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
                        </TouchableOpacity>
                        {item.status ?
                            <View
                                style={[styles.button, { backgroundColor: Colors.dark.colors.componentColor, borderColor: Colors.dark.colors.textColor, borderWidth: 1 }]}
                                className='absolute left-[18%] w-[74%] -bottom-2 h-9 flex-row overflow-hidden'
                            >
                                {(() => {
                                    // Find the hotel in the cart
                                    const hotel = cartItemsNEW.find(hotel => hotel.id === dataWithoutMenu.id);
                                    // Find the item in the hotel's orders if the hotel exists
                                    const orderItem = hotel ? hotel.orders.find(order => order.item === item.item) : null;
                                    const quantity = orderItem ? orderItem.quantity : 0;

                                    return quantity > 0 ? (
                                        <>
                                            <TouchableOpacity onPress={() => handleDecrement(item.id, title, item, dataWithoutMenu)} className='z-10 left-0 absolute w-6/12 items-center'>
                                                <Ionicons color={Colors.dark.colors.textColor} name={'remove'} size={22} />
                                            </TouchableOpacity>
                                            <Text className='uppercase text-xl font-black text-center' style={{ color: Colors.dark.colors.diffrentColorGreen }}>{quantity}</Text>
                                            <TouchableOpacity onPress={() => handleIncrement(item.id, title, item, dataWithoutMenu)} className='z-10 right-0 absolute w-6/12 items-center'>
                                                <Ionicons color={Colors.dark.colors.textColor} name={'add'} size={22} />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.colors.componentColor }]} onPress={() => handleIncrement(item.id, title, item, dataWithoutMenu)}>
                                                <Text style={[fontstyles.number, { fontSize:16, color: Colors.dark.colors.diffrentColorGreen }]}>ADD</Text>
                                            </TouchableOpacity>
                                            <Text className='top-0 right-2 absolute text-xl font-medium' style={{ color: Colors.dark.colors.textColor }}>+</Text>
                                        </>
                                    );
                                })()}
                            </View>
                            : null}
                    </View>
                    {/* {renderModal({ data: selectedItemData })} */}
                </View>
                <Text numberOfLines={1} ellipsizeMode='clip' style={{ color: Colors.dark.colors.textColor }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
            </>
        )
    };

    const [selectedIndex, setSelectedIndex] = useState(null);
    const renderMenuScroll = ({ typetitle, index }) => {
        const isSelected = selectedIndex === index; // Check if the current item is selected

        return (
            <TouchableOpacity
                key={`${index}_${typetitle}`}
                // style={{ padding: 12 }}
                className=' px-4'
                onPress={() => setSelectedIndex(index)} // Update the selected index on press
            >
                <Text
                    style={[fontstyles.h3, {
                        marginTop: -8, color: isSelected ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.textColor
                    }]}
                >
                    {typetitle}
                </Text>
            </TouchableOpacity>
        );
    }

    const renderDropdown = (menu) => (
        <>
            <View style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
                <TouchableOpacity className=' mb-6 border-b-2 flex-row items-center justify-between p-3' style={[{ borderColor: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.secComponentColor }]} onPress={() => toggleDropdown(menu.title)}>
                    <Text style={[fontstyles.entryUpper, { color: Colors.dark.colors.mainTextColor }]}>{menu.title}</Text>
                    <Ionicons color={Colors.dark.colors.mainTextColor} name={openDropdowns[menu.title] ? "caret-up-outline" : "caret-down-outline"} size={20} />
                </TouchableOpacity>
                {openDropdowns[menu.title] && (
                    <FlatList
                        data={menu.items}
                        renderItem={({ item }) => renderDropdownItem({ item, title: menu.title })}
                        keyExtractor={(item, index) => `${index}_${item.id}`}
                    />
                )}
            </View>
        </>
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
    const fontstyles = TextStyles();

    return (
        <View style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
            <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />

            {!visible && <>
                <View className=' w-full h-full'>
                    <View className='items-center'>
                        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-60 mb-1 mt-3 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.040 }} />
                        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-48 my-1 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.025 }} />
                        <View className='flex-row my-2'>
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-12 rounded-md overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.027, }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-24 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.027 }} />
                        </View>
                        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-60 my-1 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.026 }} />
                        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className=' h-3 mt-3 w-full' />
                        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='mt-5 mb-3 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.070, width: Dimensions.get('window').width * 0.95 }} />
                    </View>
                    <Text numberOfLines={1} ellipsizeMode='clip' style={[{ color: Colors.dark.colors.textColor }]}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>

                    <View className=' mt-3 px-2 flex-row'>
                        <View className='w-6/12 h-full overflow-hidden'>
                            <View className='flex-row my-1'>
                                <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-2/12 rounded-md overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.027, }} />
                                <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-4/12 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.027 }} />
                            </View>
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-8/12 my-1 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.028 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-2/12 my-1 rounded-md overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.025, }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className={`w-${getRandomNumber()}/12 my-1 rounded-md overflow-hidden justify-between`} style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.020 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className={`w-${getRandomNumber()}/12 my-1 rounded-md overflow-hidden justify-between`} style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.020 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className={`w-${getRandomNumber()}/12 my-1 rounded-md overflow-hidden justify-between`} style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.020 }} />
                        </View>
                        <View className='w-6/12 p-2'>
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='rounded-3xl w-full h-36 border-2 overflow-hidden border-slate-950' style={{ borderWidth: 2, borderColor: Colors.dark.colors.secComponentColor }} />
                        </View>
                    </View>
                    <Text numberOfLines={1} ellipsizeMode='clip' style={{ color: Colors.dark.colors.textColor }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>

                    <View className=' mt-3 px-2 flex-row'>
                        <View className='w-6/12 h-full overflow-hidden'>
                            <View className='flex-row my-1'>
                                <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-2/12 rounded-md overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.027, }} />
                                <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-4/12 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.027 }} />
                            </View>
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-8/12 my-1 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.028 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='w-2/12 my-1 rounded-md overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.025, }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className={`w-${getRandomNumber()}/12 my-1 rounded-md overflow-hidden justify-between`} style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.020 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className={`w-${getRandomNumber()}/12 my-1 rounded-md overflow-hidden justify-between`} style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.020 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className={`w-${getRandomNumber()}/12 my-1 rounded-md overflow-hidden justify-between`} style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.020 }} />
                        </View>
                        <View className='w-6/12 p-2'>
                            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='rounded-3xl w-full h-36 border-2 overflow-hidden border-slate-950' style={{ borderWidth: 2, borderColor: Colors.dark.colors.secComponentColor }} />
                        </View>
                    </View>
                    <Text numberOfLines={1} ellipsizeMode='clip' style={{ color: Colors.dark.colors.textColor }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                    <Text numberOfLines={3} ellipsizeMode='tail' className='font-semibold text-base px-5 text-center' style={{ color: Colors.dark.colors.textColor }}>
                        {getRandomNumberlodding(loadingScreenTxt)}
                    </Text>
                </View>
            </>}

            {visible &&
                <FlatList
                    data={filteredMenuItems}
                    renderItem={({ item }) => renderDropdown(item)}
                    // renderItem={({ item }) => dropDown(item, navigation, setOpenDropdowns, openDropdowns, menuItems)}
                    keyExtractor={(item, index) => `${index}_${item.title}`}
                    ListHeaderComponent={
                        <>
                            <View className='w-full rounded-3xl items-center justify-center p-2' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
                                <Text className='mb-1' style={[fontstyles.h1, { color: Colors.dark.colors.mainTextColor }]}>{Data.name}</Text>
                                <View className='flex-row justify-center items-center mb-3'>
                                    <View className='flex-row justify-center items-center mr-1'>
                                        {Data.type === "PureVeg" && <Ionicons name="leaf" size={16} color={Colors.dark.colors.diffrentColorGreen} />}
                                        <Text style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]}> {Data.type}</Text>
                                    </View>
                                    {Data.menuType.map((item, index) => (
                                        <View className=' flex-row items-center'>
                                            {/* {console.log(index)} */}
                                            <Ionicons name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                                            <Text style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]}> {item} </Text>
                                        </View>
                                    ))}
                                </View>

                                <View className='flex-row justify-center items-center gap-2 mb-3'>
                                    <View className='flex-row justify-center items-center rounded-lg py-1 px-2' style={{ paddingVertical: 2, backgroundColor: Colors.dark.colors.diffrentColorGreen }}>
                                        <Text className='mr-1' style={[fontstyles.number, { color: Colors.dark.colors.backGroundColor }]}>{Data.rating.toFixed(1)}</Text>
                                        <Ionicons name="star" color={Colors.dark.colors.backGroundColor} />
                                    </View>
                                    <Text style={[fontstyles.number, {
                                        color: Colors.dark.colors.mainTextColor, borderBottomWidth: 1, borderBottomColor: Colors.dark.colors.mainTextColor, borderStyle: 'dotted',
                                    }]}> {Data.ratingcount} ratings </Text>
                                </View>

                                <View className='flex-row justify-center items-center rounded-full py-1 px-2 mb-5' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}>
                                    <Ionicons name="navigate-circle" size={24} color={Colors.dark.colors.diffrentColorPerpleBG} />
                                    <Text className='mx-1' style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>{Data.location} </Text>
                                </View>
                                <LinearGradient
                                    start={{ x: 0.0, y: 0.01 }} end={{ x: 0.01, y: 0.8 }}
                                    colors={[Shopstatus.color[0], Shopstatus.color[1]]}
                                    className=' rounded-2xl px-5 justify-center' style={{ backgroundColor: Colors.dark.colors.secComponentColor, height: Dimensions.get('window').height * 0.13 }}>
                                    <Text className=' text-center' style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>
                                        {Shopstatus.text}
                                    </Text>
                                </LinearGradient>
                            </View>
                            <View className='flex-row justify-between p-4'>
                                <View className='flex-row gap-3'>
                                    <TouchableOpacity onPress={() => handleVegBottom()} className='flex-row justify-center items-center rounded-xl py-1 px-2' style={{ borderColor: Colors.dark.colors.textColor, borderWidth: 1 }}>
                                        <View className={`absolute z-10 ${vegBottom ? 'right-0' : 'left-2'}`}>
                                            <FoodIcon style={{ backgroundColor: 'black' }} type={'PureVeg'} size={10} padding={2} />
                                        </View>
                                        <View className='h-2 w-11 rounded-full' style={{ backgroundColor: vegBottom ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.textColor }} />
                                    </TouchableOpacity>

                                    {Data.type == 'NonVeg' && <TouchableOpacity onPress={() => { setNonVegBottom(!nonVegBottom) }} className='flex-row justify-center items-center rounded-xl py-1 px-2' style={{ borderColor: Colors.dark.colors.textColor, borderWidth: 1 }}>
                                        <View className={`absolute z-10 ${nonVegBottom ? 'right-0' : 'left-2'}`}>
                                            <FoodIcon style={{ backgroundColor: 'black' }} type={'NonVeg'} size={10} padding={2} />
                                        </View>
                                        <View className='h-2 w-11 rounded-full' style={{ backgroundColor: nonVegBottom ? '#fca5a5' : Colors.dark.colors.textColor }} />
                                    </TouchableOpacity>}
                                </View>
                                <View className='flex-row justify-center items-center rounded-xl py-1 px-2' style={{ borderColor: Colors.dark.colors.textColor, borderWidth: 1 }}>
                                    <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>Filter </Text>
                                    <Ionicons name="options-outline" size={18} color={Colors.dark.colors.mainTextColor} />
                                </View>
                            </View>
                        </>
                    }
                    ListFooterComponent={
                        <View className='p-3' style={{ backgroundColor: Colors.dark.colors.backGroundColor, height: Dimensions.get('window').height * 0.9 }}>
                            <View className='gap-3' >
                                <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.textColor }]}>
                                    Disclaimer:
                                </Text>
                                <Text style={[fontstyles.number, { color: Colors.dark.colors.textColor }]}>
                                    Be mindful of portion sizes, especially when dining out, as restaurant portions are often larger than necessary.
                                </Text>
                                <Text style={[fontstyles.number, { color: Colors.dark.colors.textColor }]}>
                                    Not all fats are bad. Omega-3 fatty acids, found in fish, flaxseeds, and walnuts, are beneficial for heart health.
                                </Text>
                                <Text style={[fontstyles.number, { color: Colors.dark.colors.textColor }]}>
                                    The average adult needs about 8 cups (2 liters) of water per day, but individual needs may vary based on activity level, climate, and overall health.
                                </Text>
                                <Text style={[fontstyles.number, { color: Colors.dark.colors.textColor }]}>
                                    An average active adult requires 2,000 kcal of energy per day; however, calorie needs may vary.
                                </Text>
                            </View>
                            <View className='mt-7' style={{ height: 1, backgroundColor: Colors.dark.colors.textColor }} />
                            <TouchableOpacity className='flex-row justify-between items-center py-3'>
                                <View className='flex-row items-center'>
                                    <Ionicons color={'red'} name={'alert-circle-outline'} size={22} />
                                    <Text style={[fontstyles.h4, { color: 'red' }]}> Report an issue with the menu</Text>
                                </View>
                                <Ionicons color={'red'} name={'caret-forward-outline'} size={22} />
                            </TouchableOpacity>
                            <View className='mb-7' style={{ height: 1, backgroundColor: Colors.dark.colors.textColor }} />
                            <View>
                                <Image
                                    source={require("./../Data/fssai.png")}
                                    className='w-14 h-11'
                                    alt="Logo"
                                />
                                <Text style={[fontstyles.number, { color: Colors.dark.colors.textColor }]}>Lic. No. 11521055001181</Text>
                            </View>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                />}

            {/* MenuScrollView */}
            {visible &&
                <>
                    <View className='absolute bottom-0 w-full'>
                        <View className='w-full bottom-0 border-t-2 flex-row items-center justify-between' style={[{ height: Dimensions.get('window').height * 0.08, borderColor: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.componentColor }]}>
                            <FlatList
                                data={Data.menu}
                                renderItem={({ item, index }) => renderMenuScroll({ typetitle: item.title, index })}
                                keyExtractor={(item, index) => `${index}_${item.title}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        {cartItemsNEW.map((item, index) => (
                            // console.log('item', item),
                            item.id === Data.id ? ( //dataWithoutMenu.id
                                <TouchableOpacity onPress={() => navigation.navigate('IndiviualCart', { item })}>
                                    <View className=' flex-row items-center justify-between p-4' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} key={`${index}_${item.id}`}>
                                        <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>
                                            {item?.orders.reduce((acc, order) => acc + order.quantity, 0)}
                                            {item?.orders.reduce((acc, order) => acc + order.quantity, 0) === 1 ? ' item' : ' items'} added
                                        </Text>
                                        <View className=' flex-row items-center'>
                                            <Text style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}>CheckOut </Text>
                                            <TouchableOpacity onPress={() => navigation.navigate('IndiviualCart', { item })}>
                                                <Ionicons color={Colors.dark.colors.mainTextColor} name={'caret-forward-circle'} size={22} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ) : null
                        ))}
                    </View>

                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredText: {
        color: Colors.dark.colors.mainTextColor,
        position: 'absolute',
        left: 0,
        right: 0,
        // top: 0,
        bottom: 0,
        textAlign: 'center',
        textAlignVertical: 'center', // For Android to vertically center text
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
    },
    button: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 8, // Adjust padding instead of fixed height
        // paddingHorizontal: 10, // Add padding for horizontal space
        // backgroundColor: '#114232',
    },
});

export default DetailsScreen;
