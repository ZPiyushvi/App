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
import { ListCard_Self2, ListCard_Z } from '../Components/ListCards';

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
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filteredData, setFilteredData] = useState(selectedIndex == 0 ? campusMenu : campusShops);
    const [ShowingOptions, setShowingOptions] = useState(false);

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

        const interval = setInterval(() => {

            setCurrentIndex((prevIndex) => (prevIndex + 1));
        }, 3000); // Change every 3 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, []);

    const featuredShop = campusShops ? campusShops.filter(item => item.featured === "true") : [];
    const featuredMenu = campusMenu ? campusMenu.filter(item => item.featured === "true") : [];
    const buffer = 0;

    const handleSearch = (text) => {
        if (text == 0) {
            setShowingOptions(false);
        }
        else {
            setShowingOptions(true);
        }

        setValue(text);
        const filtered = selectedIndex === 0
            ? campusMenu.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
            : campusShops.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));

        setFilteredData(filtered);
    };

    let placeholderText = 'Search';

    if (selectedIndex === 0) {
        if (campusMenu && campusMenu.length > currentIndex) {
            if (currentIndex + 1 === campusMenu.length) {
                setCurrentIndex(0);
            }
            placeholderText = `Search "${campusMenu[currentIndex].name}"`;
        }
    } else {
        if (campusShops && campusShops.length > currentIndex) {
            if (currentIndex + 1 === campusShops.length) {
                setCurrentIndex(0);
            }
            placeholderText = `Search "${campusShops[currentIndex].name}"`;
        }
    }

    const handleMenuPress = (index) => {
        setSelectedIndex(index);
        const filtered = index === 0
            ? campusMenu.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
            : campusShops.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));

        setFilteredData(filtered);
    };

    const renderMenuScroll = ({ item, index }) => {
        const isSelected = selectedIndex === index; // Check if the current item is selected

        return (
            <TouchableOpacity
                key={index}
                // style={{ padding: 12 }}
                className=' px-4'
                onPress={() => handleMenuPress(index)} // Update the selected index on press
            >
                <Text
                    style={{
                        color: isSelected ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.textColor
                    }}
                    className='text-lg font-semibold'
                >
                    {item}
                </Text>
            </TouchableOpacity>
        );
    }

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
                                    maxLength={50} ellipsizeMode='middle'
                                    autoFocus={true}
                                    style={[styles.textInput, { backgroundColor: Colors.dark.colors.secComponentColor, paddingLeft: 40 }]}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    value={value}
                                    onChangeText={handleSearch}
                                    placeholder={placeholderText}
                                    placeholderTextColor={Colors.dark.colors.textColor}
                                />
                                {value.length > 0 &&
                                    <View className=' absolute h-full right-3 items-center justify-center'>
                                        <TouchableOpacity
                                            onPress={() => handleSearch('')}
                                            className='rounded-full p-1 items-center justify-center'
                                            style={{ backgroundColor: Colors.dark.colors.componentColor }}
                                        >
                                            <Ionicons
                                                name="add-outline"
                                                style={{ transform: [{ rotate: '45deg' }] }}
                                                size={18}
                                                color={Colors.dark.colors.mainTextColor}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            <TouchableOpacity onPress={() => { hide_UpModelScreen(), navigation.navigate('YettoUpdate') }}>
                                <Ionicons color={Colors.dark.colors.diffrentColorOrange} name="mic" size={24} className='searchIcon' style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderRadius: 15, width: 50, height: 50, textAlign: 'center', textAlignVertical: 'center' }} />
                            </TouchableOpacity>
                        </View>

                        {/* <SlideContainor flatListRef={flatListRef} data={featuredShop//featuredMenu} viewabilityConfig={viewabilityMenuConfig} /> */}
                        {ShowingOptions ? (
                            value.length > 0 && (
                                <FlatList
                                    data={filteredData}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => { handleSearch(item.name), setShowingOptions(false) }} key={item.id} className='p-2 mt-3 flex-row items-center'>
                                            <Image
                                                source={{
                                                    uri: item.image,
                                                    method: 'POST',
                                                    headers: {
                                                        Pragma: 'no-cache',
                                                    },
                                                }}
                                                className='w-12 h-12 rounded-full mr-2'
                                                alt="Logo"
                                            />
                                            <Text className='text-gray-50 justify-center text-lg font-semibold'>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            )
                        ) : (
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                keyboardDismissMode='on-drag'
                                data={filteredData} //campusShops
                                // renderItem={({ item }) => <ListCard_Z item={item} />}
                                renderItem={({ item }) => value.length > buffer ? <ListCard_Self2 item={item} hide_Model={hide_UpModelScreen} /> : null}
                                keyExtractor={(item, index) => index.toString()}
                                ListHeaderComponent={
                                    <>
                                        <View className=' px-3'>
                                            <TitlesLeft title="Popular Options" height={2} color={Colors.dark.colors.mainTextColor} />
                                        </View>
                                        {/* featuredMenu featuredShop */}
                                        <PopularMenuContainor data={selectedIndex == 0 ? featuredMenu : featuredShop} />
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
                        )}


                    </View>
                    <View className='w-full bottom-0 border-t-2 flex-row items-center right-0' style={[{ height: Dimensions.get('window').height * 0.08, borderColor: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.componentColor }]}>
                        <FlatList
                            data={['Menu', 'Outlets']}
                            renderItem={({ item, index }) => renderMenuScroll({ item, index })}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );

    return { show_UpModelScreen, hide_UpModelScreen, RenderModel_UpModelScreen };
}

const styles = {
    textInput: {
        flex: 1,
        paddingLeft: 60,
        fontSize: 16,
        borderRadius: 15,
        fontWeight: "600",
        color: Colors.dark.colors.mainTextColor,
    },
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