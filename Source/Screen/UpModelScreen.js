import { useNavigation } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { View, Text, Modal, TextInput, TouchableOpacity, Animated, Dimensions, FlatList } from 'react-native'
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
    const popularMenu = campusMenu ? campusMenu.filter(item => item.popular === "true") : [];

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
            <View style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
                {/* <TouchableOpacity className=' mb-6 border-b-2 flex-row items-center justify-between p-3' style={[{ borderColor: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.secComponentColor }]} onPress={() => toggleDropdown(menu.title)}> */}
                <Text className=' text-xl font-black' style={[{ color: Colors.dark.colors.mainTextColor }]}>{data.name}</Text>
                <Text className=' text-xl font-black' style={[{ color: Colors.dark.colors.mainTextColor }]}>{data.details}</Text>
                {/* </TouchableOpacity> */}
            </View>
        </>
    )

    const placeholderText = campusMenu && campusMenu.length > currentIndex
        ? `Search "${campusMenu[currentIndex].name}"`
        : 'Search';

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

                    <View className=' absolute w-full top-0 p-3 pb-5' style={{ maxHeight: 750, borderBottomRightRadius: 21, borderBottomLeftRadius: 21, backgroundColor: Colors.dark.colors.backGroundColor }}>
                        <View className='searchBodyContainer flex-row justify-between pb-3'>
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
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyboardDismissMode='on-drag'
                            data={campusShops}
                            renderItem={({ item }) => render(item)}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={
                                <>
                                    <Text>value: {value}</Text>
                                    <TitlesLeft title="Popular Options" height={2} color={Colors.dark.colors.mainTextColor} />
                                    <PopularMenuContainor data={popularMenu} />
                                    <TitlesLeft title="More Options" height={2} color={Colors.dark.colors.mainTextColor} />
                                </>
                            }
                        />
                    </View>

                    {/* <TouchableOpacity style={{ flex: 1 }} onPress={() => { hide_UpModelScreen() }} /> */}
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
    textInput: {
        flex: 1,
        paddingLeft: 60,
        fontSize: 16,
        borderRadius: 15,
        fontWeight: "600",
        color: Colors.dark.colors.mainTextColor,
    },
}