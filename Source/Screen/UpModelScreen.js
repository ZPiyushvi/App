import { useNavigation } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { View, Text, Modal, TextInput, Image, TouchableOpacity, Animated, Dimensions, FlatList } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Colors from '../Components/Colors';
import { Ionicons } from '@expo/vector-icons';
import { mockCampusMenu } from "../Data/mockCampusMenu";
import SearchBox from "../Components/SearchBox";
import TitlesLeft from '../Components/TitlesLeft';
import PopularMenuContainor from "../Components/PopularMenuContainor";
import { mockCampusShops } from '../Data/mockCampusShops';

export default function ModelScreen() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const { CartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
    const show_UpModelScreen = () => setVisible(true);
    const hide_UpModelScreen = () => setVisible(false);
    const [isFocused, setIsFocused] = useState(false);
    const [campusMenu, setCampusMenu] = useState([]);
    const [value, setValue] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [campusShops, setCampusShops] = useState();

    const buffer = 3;

    const fetchFeatures = async () => {
        setCampusShops(mockCampusShops)
        setCampusMenu(mockCampusMenu)
        // try {
        //   const response = await fetch('https://fdbb94ad-4fe0-4083-8c28-aaf22b8d5dad.mock.pstmn.io/mockcampus/home/popular');
        //   if (!response.ok) {
        //     console.log('Network response was not ok');
        //   }
        //   const data = await response.json();
        //   console.log(data)
        //   setFeatures(data);
        //   if (!data) {
        //     console.log('Failed to parse response as JSON');
        //   }
        // } catch (error) {
        //   console.error("Error loading features:", error);
        // }
    };


    useEffect(() => {
        if (!isFocused && value === '') {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [isFocused, value]);

    useEffect(() => {
        fetchFeatures();
    }, []);

    useEffect(() => {
        // setCampusMenu(mockCampusMenu.map(item => item.name));

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % mockCampusMenu.length);
        }, 3000); // Change every 3 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, []);

    const render = (data) => (
        <>
            {/* <View style={{ backgroundColor: Colors.dark.colors }}> */}
            <View className=' mt-5 rounded-xl' style={styles.popularFeatureBodyContainer}>
                <View className=' flex-row h-full p-2 items-center'>
                    <Image
                        source={{
                            uri: data.image,
                            method: 'POST',
                            headers: {
                                Pragma: 'no-cache',
                            },
                        }}
                        className=' h-full w-7/12 rounded-lg'
                        style={{ borderWidth: 2, borderColor: Colors.dark.colors.secComponentColor, }}
                        alt="Logo"
                    />
                    <View className='flex-1 px-2'>
                        <Text className='font-black text-base' style={{ color: Colors.dark.colors.textColor }}>{data.menutype}</Text>
                        <Text className='font-light text-lg -mt-1' numberOfLines={2} ellipsizeMode='tail' style={{ color: Colors.dark.colors.mainTextColor }}>{data.name}</Text>
                        <TouchableOpacity
                            className='justify-center items-center rounded-md mt-2 px-3 py-1'
                            style={{
                                backgroundColor: Colors.dark.colors.diffrentColorOrange,
                                alignSelf: 'flex-start',
                            }}
                        >
                            <Text className='text-base font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>Buy now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )

    const placeholderText = campusMenu && campusMenu.length > currentIndex
        ? `Search "${campusMenu[currentIndex].name}"`
        : 'Search';

    const featuredMenu = campusMenu ? campusMenu.filter(item => item.featured === "true") : [];
    const featuredShop = campusShops ? campusShops.filter(item => item.featured === "true") : [];

    const RenderModel_UpModelScreen = () => (
        <>
            {/* <StatusBar hidden /> */}
            <Modal
                visible={visible}
                onRequestClose={hide_UpModelScreen}
                animationType="fade"
                transparent
            >
                <View className=' w-full h-full' style={{ flex: 1, backgroundColor: 'rgba(355, 355, 355, 0.3)' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => { hide_UpModelScreen() }} />

                    <View className=' absolute w-full top-0 pb-5' style={{ maxHeight: 750, borderBottomRightRadius: 21, borderBottomLeftRadius: 21, backgroundColor: Colors.dark.colors.backGroundColor }}>
                        <View className='searchBodyContainer px-3 pt-3 flex-row justify-between pb-3'>
                            <View className='searchInputTxt justify-center rounded-xl text-base px-3 w-[81%]' style={{ backgroundColor: Colors.dark.colors.secComponentColor, height: 50 }}>
                                <Ionicons
                                    color={Colors.dark.colors.diffrentColorOrange}
                                    name="search"
                                    size={24}
                                    style={styles.icon}
                                />
                                <TextInput
                                    autoFocus={true}
                                    style={[styles.textInput, { numberOfLines: 3, ellipsizeMode: 'tail', backgroundColor: Colors.dark.colors.secComponentColor, paddingLeft: 40 }]}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    value={value}
                                    onChangeText={setValue}
                                    placeholder={placeholderText}
                                    placeholderTextColor={Colors.dark.colors.textColor}
                                />
                            </View>
                            <Ionicons color={Colors.dark.colors.diffrentColorOrange} name="mic" size={24} className='searchIcon' style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderRadius: 15, width: 50, height: 50, textAlign: 'center', textAlignVertical: 'center' }} />
                        </View>

                        {/* <SlideContainor flatListRef={flatListRef} data={featuredShop//featuredMenu} viewabilityConfig={viewabilityMenuConfig} /> */}


                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyboardDismissMode='on-drag'
                            data={featuredMenu} //featuredMenu featuredShop
                            renderItem={({ item }) => value.length > buffer ? render(item) : null}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={
                                <>
                                    <View className=' px-3'>
                                        <TitlesLeft title="Popular Options" height={2} color={Colors.dark.colors.mainTextColor} />
                                    </View>
                                    {/* featuredMenu featuredShop */}
                                    <PopularMenuContainor data={featuredMenu} />
                                    {
                                        value.length > buffer ?
                                            <View className=' px-3'>
                                                <TitlesLeft title="Search Results" height={2} color={Colors.dark.colors.mainTextColor} />
                                            </View>
                                            : null
                                    }
                                </>
                            }
                        />
                    </View>

                </View>
            </Modal>
        </>
    );

    return { show_UpModelScreen, hide_UpModelScreen, RenderModel_UpModelScreen };
}

const styles = {
    icon: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    popularFeatureBodyContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.03,  // should be applyed to all fixed items
        // marginTop: Dimensions.get('window').height * 0.04, // should be applyed to all fixed items
        height: Dimensions.get('window').height * 0.18,
        width: Dimensions.get('window').width * 0.94,
        backgroundColor: Colors.dark.colors.componentColor, // bg color
        borderWidth: 2,
        borderColor: Colors.dark.colors.secComponentColor,
    },
    popularFeatureSplitContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    popularFeaturesContent: {
        // flex: 1,
        // padding: 7,
    },
    text: {
        margin: 24,
        fontSize: 60,
    },
}