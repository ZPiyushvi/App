// Details.js
import React, { useContext, useRef, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, FlatList, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import PopUp from '../Components/PopUp';
import Colors from '../Components/Colors';
import { GlobalStateContext } from '../Context/GlobalStateContext';

const BANNER_H = 400;

const Details = ({ route }) => {
    // const [value, setValue] = useState('');
    const { data } = route.params || {};
    const scrollA = useRef(new Animated.Value(0)).current;
    const { Openmodal, setOpenmodal, renderModal } = PopUp();
    const [selectedItemData, setSelectedItemData] = useState();

    const { CartItems, setCartItems, setQuantity, quantity } = useContext(GlobalStateContext);

    const renderAddToCart = (item) => {
        { console.log(CartItems) }
        setCartItems(prevCartItems => [...prevCartItems, item]);
    };

    const viewabilityMenuConfig = {
        itemVisiblePercentThreshold: 50
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1); // Increment quantity for this item
    };
    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1); // Decrement quantity, but ensure it doesn't go below 0
        }
    };

    const RenderInputText = () => {
        const [value, setValue] = React.useState('');

        const handleChange = (newValue) => {
            setValue(newValue);
        };

        return (
            <TextInput
                style={[styles.textInput, { backgroundColor: Colors.dark.colors.secComponentColor }]}
                value={value}
                onChangeText={handleChange}
                keyboardType="numeric"
            />
        );
    };

    const renderIncrimentDecriment = (type) => {
        const [Amunt, setAmunt] = useState(0);
        if (type == 'incriment') {
            setAmunt(Amunt + 1)
        }
        if (type == 'decriment') {
            if (quantity > 0) {
                setAmunt(Amunt - 1)
            }
        }

    }

    const renderDropdown = ({ typetitle, items }) => {
        const [openDropDown, setOpenDropDown] = useState(true); // State to manage dropdown visibility

        const toggleDropDown = () => {
            setOpenDropDown(!openDropDown);
        };

        const renderItem = ({ item }) => (
            // const [Amunt, setAmunt] = useState(0);
            <View
                className=' flex-row justify-between items-center'
                style={{ backgroundColor: 'fuchsia', padding: 30 }}
            >
                <TouchableOpacity
                    onPress={() => { setOpenmodal(true), setSelectedItemData(item) }}
                >
                    <Text>{item.item} - ₹{item.price}</Text>
                    <Text>{quantity}</Text>
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
                        {quantity ? (
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
                        )}

                    </View>
                </View>

            </View>
        );

        return (
            <View>
                <TouchableOpacity className='flex-row p-4 justify-between' onPress={toggleDropDown}>
                    <Text className=' font-extrabold text-xl'>{typetitle}</Text>
                    <Ionicons name={openDropDown ? "caret-up-outline" : "caret-down-outline"} size={24} />
                </TouchableOpacity>
                {openDropDown && (
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        );
    };

    const status = ({ closingTime, openingTime }) => {

        const currentTime = moment();
        let currentDay = moment().format('dddd');

        let openingMoment = moment(openingTime, 'LT');
        let closingMoment = moment(closingTime, 'LT');

        // Handling closing time crossing midnight
        // if (closingMoment.isBefore(openingMoment)) {
        //     if (currentTime.isAfter(closingMoment)) {
        //         closingMoment.add(1, 'day'); // Adding a day to closing time if it's before opening time
        //     } else {
        //         closingMoment.subtract(1, 'day'); // Subtracting a day from closing time if it's after opening time
        //     }
        // }

        const openingDifference = openingMoment.diff(currentTime, 'minutes');
        const closingDifference = closingMoment.diff(currentTime, 'minutes');

        // console.log("Current Time:", currentTime.format('LT'));
        // console.log("Opening Time:", openingMoment.format('LT'));
        // console.log("Closing Time:", closingMoment.format('LT'));
        // console.log("openingDifference", openingDifference);
        // console.log("closingDifference", closingDifference);

        if (currentTime.isBetween(openingMoment, closingMoment)) {
            return (
                <Text className='text-center text-gray-50'>We're open and ready to serve! Dive into our menu now and enjoy a delicious meal!</Text>
            );
        } else if (openingDifference > 0 && openingDifference <= 60) {
            return (
                <Text className='text-center text-gray-50'>Almost there! just {openingDifference} minutes until kitchen's back in action! Get ready to place your order!</Text>
            );
        } else if (closingDifference > 0 && closingDifference <= 60) {
            return (
                <Text className='text-center text-gray-50'>Hurry up! Kitchen's closing in {closingDifference} minutes!. Get your order in now before it's too late!"</Text>
            );
        } else {
            return (
                <Text className='text-center text-base font-medium leading-5 text-gray-50'>Oops! You missed it! Closed for now, but we'll return tomorrow, same spot, same place</Text>
            );
        }
    };

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
                        color: isSelected ? Colors.dark.colors.diffrentColorOrange : Colors.dark.colors.textColor
                    }}
                >
                    {typetitle}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 67 }}
            >
                <View style={[styles.bannerContainer, { alignItems: 'center' }]}>
                    {/* <Animated. */}
                    <Animated.View style={styles.banner(scrollA)}>
                        <View className=' w-full h-64 bg-gradient-to-r from-cyan-500 to-blue-500 bg-black'>
                            <Image
                                source={require('./../../assets/burgur.png')}
                                className=' w-full h-full object-contain'
                                style={{ objectFit: 'contain' }}
                                alt="Logo"
                            />

                            <View className='w-full absolute bottom-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.40)' }}>
                                <View
                                    className=' w-1/2 items-center justify-center p-4'
                                    style={{
                                        left: '25%', // Center horizontally by setting the left margin to 25% of the screen width
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {status({ closingTime: data.closingtime, openingTime: data.openingtime })}
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text className='text-3xl font-semibold'>{data.name}</Text>
                            <View className='flex-row gap-2 justify-center items-center mb-2'>
                                <View className='flex-row justify-center items-center'>
                                    {data.type === "Veg" && <Ionicons name="leaf" size={18} color={'green'} />}
                                    <Text className='text-base ml-1'>{data.type}</Text>
                                </View>
                                <Ionicons name="ellipse" size={5} />
                                <Text className='text-base'>{data.menutype}</Text>
                            </View>

                            <View className='flex-row justify-center items-center gap-1 mb-3'>
                                <View className=' flex-row justify-center items-center bg-green-600 rounded-lg px-2'>
                                    <Text className='text-lg font-semibold mr-1 text-white'>{data.rating}</Text>
                                    <Ionicons name="star" color={'white'} />
                                </View>
                                <Text className='text-base' style={{ textDecorationLine: 'underline', textDecorationStyle: 'dotted' }}>{data.ratingcount}</Text>
                            </View>
                            <View className='flex-row justify-center items-center bg-slate-300 rounded-full py-1 px-1'>
                                <Ionicons name="navigate-circle" size={24} color={'red'} />
                                <Text className=' m-1'>{data.location}</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>

                <View className="w-48 h-1 mx-auto my-4 bg-gray-900 border-0 rounded md:my-10 dark:bg-gray-700" />

                {data.menu.map((menu, index) => (
                    <React.Fragment key={index}>
                        {renderDropdown({ typetitle: menu.title, items: menu.items })}
                    </React.Fragment>
                ))}

                {/* {renderModal({ data: selectedItemData })} */}
            </Animated.ScrollView>

            {/* MenuScrollView */}

            <View style={styles.bottomContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {data.menu.map((menu, index) => (
                        renderMenuScroll({ typetitle: menu.title, index: index })
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = {
    textInput: {
        flex: 1,
        paddingLeft: 60, // Padding to make space for the icon
        fontSize: 16,
        borderRadius: 15,
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: Colors.dark.colors.backGroundColor, // Adjust if you want a specific background color
        paddingVertical: 8, // Adjust padding as needed
    },
    button: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 8, // Adjust padding instead of fixed height
        // paddingHorizontal: 10, // Add padding for horizontal space
        backgroundColor: '#114232',
    },
    buttonTxt: {
        color: '#F7F6BB',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    text: {
        margin: 24,
        fontSize: 16,
    },
    bannerContainer: {
        // marginTop: -1000,
        // paddingTop: 1000,
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        // resizeMode: 'contain', // remove based on desired width
        height: BANNER_H,
        width: '200%',
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [2, 1, 0.5, 0.5],
                }),
            },
        ],
    }),
};

export default Details;