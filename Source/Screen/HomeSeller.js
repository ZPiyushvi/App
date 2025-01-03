const BANNER_H = Dimensions.get('window').height * 0.55;
const Gradient_H = Dimensions.get('window').height * 0.5;

import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList, Animated, Dimensions, ImageBackground, Image, BackHandler, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Components/Colors'; // Adjust path as needed
import { API_BASE_URL, USERSDATA_ENDPOINT, ADDOUTLET_ENDPOINT, USEROUTLETS_ENDPOINT, ADDMENU_ENDPOINT } from '../Constants/Constants';
// import { ADDOUTLET_ENDPOINT, USEROUTLETS_ENDPOINT, API_BASE_URL // Adjust paths/constants
import { ListCard_Self2, ListCard_Z } from '../Components/ListCards';
import SearchBox from "../Components/SearchBox";
import ModelScreen from './ModelScreen';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Titles from '../Components/Titles';
import FoodIcon from '../Components/FoodIcon';
import FoodTypeIcon from '../Components/FoodTypeIcon';
import LongStarIcon from '../Components/LongStarIcon';
import { dropDown } from '../Components/dropDown';
import { useFocusEffect } from '@react-navigation/native';
import Details_Seller from '../Components/Details_Seller';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import ToastNotification from '../Components/ToastNotification';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import Size from '../Components/Size';
import TextStyles from '../Style/TextStyles';
import { StatusBar } from 'react-native';
import UpModelScreen from './UpModelScreen';
import MenuSellerFlatlist from '../Components/MenuSellerFlatlist';

export default function HomeSeller({ navigation }) {

    const [type, settype] = useState('');
    const { show, hide, RenderModel } = ModelScreen();
    // const [userData, setUserData] = useState([]);
    const [outlets, setOutlets] = useState([]);
    const [newItem, setNewItem] = useState();
    const [sortItem, setSortItem] = useState('AllItems');

    const { fontsLoaded, userData, setUserData, fontFamilies } = useContext(GlobalStateContext);

    if (!fontFamilies) {
        return null;
    }
    // fontFamily: fontFamilies.bold,
    const { show_UpModelScreen, hide_UpModelScreen, RenderModel_UpModelScreen } = UpModelScreen();

    useFocusEffect(
        React.useCallback(() => {
            getUserOutlets();
            BackHandler.addEventListener('hardwareBackPress', handle_hardwareBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handle_hardwareBackPress);
            };
        }, [])
    );

    useEffect(() => {
        handleSaveMenu()
        // getData();
    }, [newItem]);

    useEffect(() => {
        // handleSaveMenu()
        getData();
    }, []);

    const flatListRef = useRef(null);

    const navToPage = (page) => {
        navigation.navigate(page);
    };

    const handle_hardwareBackPress = () => {
        Alert.alert(
            "Leaving So Soon?",
            "You're about to exit the app. Are you sure you want to leave all this deliciousness behind?",
            [{
                text: "No, Stay",
                onPress: () => null
            }, {
                text: "Yes, Exit",
                onPress: () => BackHandler.exitApp()
            }]);
        return true;
    }

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            console.log(token)
            const response = await fetch(`${API_BASE_URL}:${USERSDATA_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            // console.log('data', data)
            setUserData(data.data)
            // console.log("userData", "home", data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getUserOutlets = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}:${USEROUTLETS_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setOutlets(data.data);
            setNewItem(data.data[0].menu)
        } catch (error) {
            console.log('user has not set outlet yet');
        }
    };

    const scrollA = useRef(new Animated.Value(0)).current;

    const [openDropdowns, setOpenDropdowns] = useState(() => {
        const initialDropdowns = {};
        // if (Array.isArray(outlets[0])) {
        newItem?.forEach(menu => {
            // console.log('title', menu.title)
            initialDropdowns[menu.title] = true;
        })
        // };
        // setVisible(true);
        return initialDropdowns;
    });

    const navToEditRestorent = () => {
        navigation.navigate('EditMain', { outlet: outlets[0] })
        // navigation.navigate('EditRestorent')
    }

    const navToEditMain = () => {
        navigation.navigate('EditMain', { outlet: null })
    }


    const [showToast, setShowToast] = useState(false);

    const handleSaveMenu = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const dataToSend = { menu: newItem, token };
            const privdataToSend = { menu: newItem, token };
            console.log('Sending data'); //dataToSend 
            // newItem.forEach((item) => {
            //     console.log('itemxxxx', item.items);
            // });

            const response = await fetch(`${API_BASE_URL}:${ADDMENU_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();
            if (data.status === "ok") {
                // setShowToast(true);

                // setTimeout(() => {
                //     setShowToast(false);
                // }, 2500);
                console.log('HomeSellerUpdated')
                // Alert.alert("Menu saved successfully");
            } else {
                // Alert.alert(data.data);
            }
        } catch (error) {
            console.error("Error saving menu:", error);
        }
    };


    const handleChanges = (title, field, value, itemname) => {
        setNewItem(newItem.map(item => {
            if (item.title === title) {
                return {
                    ...item,
                    items: item.items.map(subItem => {
                        if (subItem.item === itemname) {
                            return {
                                ...subItem,
                                status: !subItem.status
                            };
                        }
                        return subItem; // Ensure other items are returned unchanged
                    })
                };
            }
            return item; // Ensure other items are returned unchanged
        }));

        // handleSaveMenu();
    };

    //     handleSaveMenu();
    // };
    // const filteredItems = newItem.map(category => ({
    //     ...category,
    //     items: category.items.filter(item => item.status === true)
    // }));
    // const filter()

    const fontstyles = TextStyles();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1, backgroundColor: '#yourPreferredColor' }}
        >
            <View className={`bodyContainer w-full flex`} style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                <StatusBar backgroundColor={Colors.dark.colors.subbackGroundColor} />

                <LinearGradient
                    // Button Linear Gradient
                    colors={["black", Colors.dark.colors.backGroundColor, Colors.dark.colors.secComponentColor]} className='bodyBGContainer absolute w-full rounded-b-lg' style={{ height: Gradient_H, backgroundColor: Colors.dark.colors.componentColor }} />
                {/* <LinearGradient
            // Button Linear Gradient
            colors={["black", "black", Colors.dark.colors.backGroundColor, Colors.dark.colors.componentColor, Colors.dark.colors.secComponentColor]} className='bodyBGContainer absolute w-full rounded-b-lg' style={{ height: Dimensions.get('window').height * 0.5, backgroundColor: Colors.dark.colors.componentColor }}
          /> */}
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                        { useNativeDriver: true },
                    )}
                    scrollEventThrottle={16}
                    keyboardDismissMode='on-drag'
                >
                    <View className='staticContainer flex w-1/2 ' >
                        <Animated.View style={[styles.banner(scrollA)]}>
                            {/* ---------------------- Added ---------------------- */}
                            <View className='searchBodyContainer flex-row justify-between' style={{ marginHorizontal: Dimensions.get('window').width * 0.03 }}>
                                <View className='address flex-row gap-2 items-center w-9/12'>
                                    <Ionicons color={Colors.dark.colors.diffrentColorOrange} name="earth" size={24} className='searchIcon' style={{ textAlign: 'center', textAlignVertical: 'center' }} />
                                    <View>
                                        <View className=' flex-row'>
                                            {/* {console.log(userData.name)} */}
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>{userData.name ? TruncatedTextComponent(userData.name, 21) : "UserName"} </Text>
                                            <Ionicons color={Colors.dark.colors.mainTextColor} name="chevron-down" size={24} style={{ textAlign: 'center', textAlignVertical: 'center' }} />
                                        </View>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>{userData.name ? 'you are a ' + userData.role : "UserRole"}</Text>
                                    </View>
                                </View>
                                <View className='address flex-row gap-2 items-center'>
                                    <Ionicons onPress={() => { settype('lang'), show() }} color={Colors.dark.colors.textColor} name="language" size={24} style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderRadius: 10, width: 40, height: 40, textAlign: 'center', textAlignVertical: 'center' }} />
                                    <Ionicons color={Colors.dark.colors.diffrentColorPerple} activeOpacity={1} onPress={() => navigation.navigate('Profile', { userData })} name="person" size={24} style={{ backgroundColor: Colors.dark.colors.mainTextColor, borderRadius: 10, width: 40, height: 40, textAlign: 'center', textAlignVertical: 'center' }} />
                                </View>
                            </View>

                            <View className='pt-7 px-4'>
                                <View className='flex-row items-center'>

                                    <Text style={[fontstyles.h1, { color: Colors.dark.colors.mainTextColor }]}>How</Text>
                                    <Text style={[fontstyles.h1, { color: Colors.dark.colors.diffrentColorOrange }]}> Our App</Text>
                                </View>

                                <Text style={[fontstyles.entryUpper, { color: Colors.dark.colors.mainTextColor }]}>displays it.</Text>

                            </View>
                            <View className='mt-5'>
                                {outlets[0] ? (
                                    <ListCard_Self2 index={0} item={outlets[0]} onPress={navToEditRestorent} />
                                ) : (
                                    <ListCard_Self2 index={0} item={'null'} onPress={navToEditMain} />
                                )}
                            </View>
                            {/* ---------------------- Added ---------------------- */}
                        </Animated.View>
                    </View>

                    <View style={styles.verticalScrollContainer}>
                        {/* ---------------------- Added ---------------------- */}

                        <View className='mx-4 pt-6 overflow-hidden' style={{ height: Dimensions.get('window').height * 0.08 }}>
                            <Titles title={"Your Offerings"} width={80} />
                        </View>

                        {/* <View className='searchBodyContainer flex-row justify-between my-3' style={{ marginHorizontal: Dimensions.get('window').width * 0.03 }}>
                        <TouchableOpacity className='w-[83%]' onPress={() => show_UpModelScreen()}>
                            <SearchBox />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('YettoUpdate')}>
                            <Ionicons color={Colors.dark.colors.diffrentColorOrange} name="mic" size={24} className='searchIcon' style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderRadius: 15, width: 50, height: 50, textAlign: 'center', textAlignVertical: 'center' }} />
                        </TouchableOpacity>
                    </View> */}
                        <View className='flex-row gap-x-2 py-4 px-2 mt-3 top-0 sticky'>
                            <TouchableOpacity onPress={() => setSortItem('AllItems')} className='flex-row justify-center items-center rounded-xl py-1 px-2' style={{ borderColor: sortItem == 'AllItems' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.mainTextColor, borderWidth: 1 }}>
                                {/* {console.log(newItem)} */}
                                <Text style={[fontstyles.number, { color: sortItem == 'AllItems' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.mainTextColor }]}>All Items </Text>
                                {/* <Text style={[fontstyles.entryUpper, { color: sortItem == 'AllItems' ? Colors.dark.colors.diffrentColorPerpleBG : Colors.dark.colors.textColor }]}>(12)</Text> */}
                                {/* <Ionicons name="options-outline" size={18} color={Colors.dark.colors.mainTextColor} /> */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSortItem('InStock')} className='flex-row justify-center items-center rounded-xl py-1 px-2' style={{ borderColor: sortItem == 'InStock' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.mainTextColor, borderWidth: 1 }}>
                                <Text style={[fontstyles.number, { color: sortItem == 'InStock' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.mainTextColor }]}>In Stock </Text>
                                {/* <Text style={[fontstyles.number, { color: sortItem == 'InStock' ? Colors.dark.colors.diffrentColorPerpleBG : Colors.dark.colors.textColor }]}>(12)</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSortItem('SoldOut')} className='flex-row justify-center items-center rounded-xl py-1 px-2' style={{ borderColor: sortItem == 'SoldOut' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.mainTextColor, borderWidth: 1 }}>
                                <Text style={[fontstyles.number, { color: sortItem == 'SoldOut' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.mainTextColor }]}>Sold Out </Text>
                                {/* <Text className='font-light text-sm' style={{ color: sortItem == 'SoldOut' ? Colors.dark.colors.diffrentColorPerpleBG : Colors.dark.colors.textColor }}>(12)</Text> */}
                            </TouchableOpacity>
                        </View>

                        {/* <View className='h-1 my-2' style={{backgroundColor: Colors.dark.colors.secComponentColor}} /> */}

                        <FlatList
                            data={(() => {
                                if (sortItem === 'InStock') {
                                    return newItem?.map(category => ({
                                        ...category,
                                        items: category.items.filter(item => item.status === true)
                                    }));
                                } else if (sortItem === 'SoldOut') {
                                    return newItem?.map(category => ({
                                        ...category,
                                        items: category.items.filter(item => item.status === false)
                                    }));
                                } else {
                                    return newItem;
                                }
                            })()}
                            renderItem={({ item, index }) => dropDown(index, fontstyles, item, navigation, setOpenDropdowns, openDropdowns, handleChanges)}
                            keyExtractor={(item, index) => `${item.id}_${index}`} // Example key extractor, adjust as needed
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
                                            defaultSource={require('./../../assets/store.jpg')}
                                            className='w-14 h-11'
                                            alt="Logo"
                                        />
                                        <Text style={[fontstyles.number, { color: Colors.dark.colors.textColor }]}>Lic. No. 11521055001181</Text>
                                    </View>
                                </View>
                            }
                            showsHorizontalScrollIndicator={false}
                        />
                        {/* <MenuSellerFlatlist fontstyles={fontstyles}
                    newItem={newItem} sortItem={sortItem} navigation={navigation} setOpenDropdowns={setOpenDropdowns} openDropdowns={openDropdowns} handleChanges={handleChanges}
                    /> */}

                        {/* <Details_Seller navigation={navigation} /> */}
                        {/* ---------------------- Added ---------------------- */}
                    </View>

                </Animated.ScrollView>
                {RenderModel({ type: { type } })}
                {RenderModel_UpModelScreen()}
                {showToast && (
                    <ToastNotification
                        title="Success!"
                        description="Status updated successfully."
                        showToast={showToast}
                    />
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    stickyHeader: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginTop: 20,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'white',
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
    },
    button: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    addButton: {
        backgroundColor: Colors.dark.colors.diffrentColorOrange,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark.colors.mainTextColor,
    },
    outletItem: {
        backgroundColor: 'grey',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    outletText: {
        color: 'white',
    },
    shadowProp: {
        // backgroundColor: 'rgba(180, 180, 180, 0.1)',
        // shadowOffset: {
        //   width: 0,
        //   height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,
        elevation: 30,

    },
    verticalScrollContainer: {
        // marginTop: Dimensions.get('window').height * 0.1,
        // minHeight: Dimensions.get('window').height * 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        // backgroundColor: 'white',
        backgroundColor: Colors.dark.colors.backGroundColor, // bg color
    },

    banner: scrollA => ({
        height: BANNER_H,
        backGroundColor: 'red',
        width: '200%',
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H],
                    outputRange: [-0, 0, BANNER_H * 0.99, -BANNER_H * 0.5], // Adjust to bring back into view
                }),
            },
            // {
            //   scale: scrollA.interpolate({
            //     inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
            //     outputRange: [2, 1, 0.5, 0.5],
            //   }),
            // },
        ],
    }),
});
