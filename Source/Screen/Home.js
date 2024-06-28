// import { BANNER_H } from "./../Constants/Constants"
const BANNER_H = Dimensions.get('window').height * 0.87;
import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, Animated, BackHandler, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SlideContainor from "../Components/SlideContainor";
import { mockCampusShops } from "../Data/mockCampusShops";
import { mockCampusMenu } from "../Data/mockCampusMenu";
import PopularMenuContainor from "../Components/PopularMenuContainor";
import Content from "../Components/Content";
import Titles from "../Components/Titles";
import Colors from "../Components/Colors";
import TruncatedTextComponent from "../Components/TruncatedTextComponent";
import PopUpLang from "../Components/PopUpLang";
import SearchBox from "../Components/SearchBox";
import { LinearGradient } from 'expo-linear-gradient';
import { FirstStoreComponent } from '../Components/CartMainContainor';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import ModelScreen from './ModelScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, USERSDATA_ENDPOINT } from '../Constants/Constants';
import Popular from '../Components/Popular';
import Model from './Model';
import Like from './Like';
import { avalableLanguages } from '../Data/avalableLanguages';
import LangContent from '../Components/RenderLangContent';

const Home = () => {
  const [userData, setUserData] = useState([]);

  // const { Openmodal, setOpenmodal, renderModal } = PopUpLang(); /// Error Why
  const navigation = useNavigation();
  const { show, hide, RenderModel } = ModelScreen();
  // const { show, hide, RenderModel } = Model();
  const { CartItems, updatedCartWithDetails } = useContext(GlobalStateContext);

  const scrollA = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  const [campusShops, setcampusShops] = useState([]);
  const [campusMenu, setcampusMenu] = useState([]);

  const [type, settype] = useState('');

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

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handle_hardwareBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handle_hardwareBackPress)
      }
    })
  ),

    useEffect(() => {
      fetchFeatures();
      getData();
    }, []);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      // http://192.168.110.12:5001/userdata
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
      setUserData(data.data)
      console.log(userData, "home", data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchFeatures = async () => {
    setcampusShops(mockCampusShops)
    setcampusMenu(mockCampusMenu)
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

  const featuredData = campusShops ? campusShops.filter(item => item.featured === "true") : [];
  const popularMenu = campusMenu ? campusMenu.filter(item => item.popular === "true") : [];

  const viewabilityMenuConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View className={`bodyContainer w-full flex`} style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
      <LinearGradient
        // Button Linear Gradient
        colors={["black", "black", Colors.dark.colors.backGroundColor, Colors.dark.colors.componentColor, Colors.dark.colors.secComponentColor]} className='bodyBGContainer absolute w-full rounded-b-lg' style={{ height: Dimensions.get('window').height * 0.5, backgroundColor: Colors.dark.colors.componentColor }} />
      <Animated.ScrollView
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        keyboardDismissMode='on-drag'
      >

        <View className='staticContainer align-middle flex w-1/2' >
          <Animated.View style={[styles.banner(scrollA)]}>

            <View className='searchBodyContainer mt-7 flex-row justify-between' style={{ marginHorizontal: Dimensions.get('window').width * 0.03 }}>
              <View className='address flex-row gap-2 items-center w-9/12'>
                <Ionicons color={Colors.dark.colors.diffrentColorOrange} name="earth" size={24} className='searchIcon' style={{ textAlign: 'center', textAlignVertical: 'center' }} />
                <View>
                  <TouchableOpacity activeOpacity={1} onPress={() => navToPage('SelectAddress')} className=' flex-row'>
                    {console.log(userData.name)}
                    <Text numberOfLines={1} ellipsizeMode='tail' className=' text-xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>{userData.name ? userData.name : "UserName"} </Text>
                    <Ionicons color={Colors.dark.colors.mainTextColor} name="chevron-down" size={24} style={{ textAlign: 'center', textAlignVertical: 'center' }} />
                  </TouchableOpacity>
                  <Text numberOfLines={1} ellipsizeMode='tail' className=' text-base font-normal' style={{ color: Colors.dark.colors.textColor }}>{"plot number 45, new row house"}</Text>
                </View>
              </View>
              <View className='address flex-row gap-2 items-center'>
                <Ionicons onPress={() => {settype('lang'), show()}} color={Colors.dark.colors.textColor} name="language" size={24} style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderRadius: 10, width: 40, height: 40, textAlign: 'center', textAlignVertical: 'center' }} />
                <Ionicons color={Colors.dark.colors.diffrentColorPerple} activeOpacity={1} onPress={() => navigation.navigate('Profile', { userData })} name="person" size={24} style={{ backgroundColor: Colors.dark.colors.mainTextColor, borderRadius: 10, width: 40, height: 40, textAlign: 'center', textAlignVertical: 'center' }} />
              </View>
            </View>

            <View className='pt-7 px-4'>
              <Text className=' text-4xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>Discover the best</Text>
              <View className='flex-row'>
                <Text className=' text-4xl font-black' style={{ color: Colors.dark.colors.diffrentColorOrange }}>Meal </Text>
                <Text className=' text-4xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>for you</Text>
              </View>
            </View>

            <View className='searchBodyContainer mt-5 flex-row justify-between' style={{ marginHorizontal: Dimensions.get('window').width * 0.03 }}>
              <SearchBox />
              <Ionicons color={Colors.dark.colors.diffrentColorOrange} name="mic" size={24} className='searchIcon' style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderRadius: 15, width: 50, height: 50, textAlign: 'center', textAlignVertical: 'center' }} />
            </View>

            {/* <Popular flatListRef={flatListRef} data={featuredData} viewabilityConfig={viewabilityMenuConfig} /> */}
            <SlideContainor flatListRef={flatListRef} data={featuredData} viewabilityConfig={viewabilityMenuConfig} />

            <Titles title={"What’s on your heart?"} width={30} />
            
            <PopularMenuContainor data={popularMenu} />

          </Animated.View>

        </View>

        <View style={styles.verticalScrollContainer}>

          <View>
            <View style={{ height: Dimensions.get('window').height * 0.08 }}>
              <Titles title={"All Restaurants"} width={60} />
            </View>

            <Content data={campusShops} />

            <View className='justify-center' style={{ height: Dimensions.get('window').height * 0.12 }}>
              <Text
                className='font-black text-xl text-center'
                style={{ color: Colors.dark.colors.diffrentColorOrange }}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                Exciting Updates Coming Soon!
              </Text>
              <Text
                className='font-light text-sm text-center'
                style={{ color: Colors.dark.colors.textColor }}
                numberOfLines={3}
                ellipsizeMode='tail'
              >
                We're working on bringing you fresh new choices. Meanwhile, explore our current selection and find your perfect match!
              </Text>
            </View>
          </View>

        </View>

      </Animated.ScrollView>

      <View>
        {(!updatedCartWithDetails || updatedCartWithDetails.length === 0 || !updatedCartWithDetails[updatedCartWithDetails.length - 1]) ?
          null
          :
          <LinearGradient
            className=' absolute p-2 w-full bottom-0'
            colors={['transparent', Colors.dark.colors.backGroundColor, Colors.dark.colors.backGroundColor]}>
            <FirstStoreComponent updatedCartWithDetails={updatedCartWithDetails} Modelshow={show} settype={settype} />
          </LinearGradient>
        }
      </View>
      {RenderModel({type: {type}})}
    </View>
  );
};

const styles = {
  line: {
    width: 60,
    height: 1,
    backgroundColor: '#D1D5DB', // Equivalent to bg-gray-200
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: "black" // bg color
  },
  bodyBGContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height * 0.3,
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "white", // bg color
  },

  staticContainer: {
    // height: Dimensions.get('window').height * 0.67,
    // marginTop: -1000,
    // paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
    position: 'absolute',
  },

  searchInputTxt: {
    width: '73%',
    height: '100%',
    // padding: 14,
    paddingLeft: 14,
    textAlignVertical: 'center',
    fontSize: 16, // font size
    backgroundColor: '#e2c625', // bg color
    borderRadius: 14,
  },
  searchIcon: {
    height: '100%',
    width: '20%',
    // padding: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#e2c625', // bg color
    borderRadius: 14,
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
  content: {
    color: '#006769',
    alignItems: 'center',
    justifyContent: 'center',
  },



  // Common Styling
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    paddingVertical: 8, // Adjust padding instead of fixed height
    // paddingHorizontal: 10, // Add padding for horizontal space
    backgroundColor: '#114232',
  },
  buttonTxt: {
    color: '#F7F6BB',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  NormalTxt: {
    color: "#FCDC2A",
    fontWeight: '500',
    fontSize: 14,
  },
  BoldTxt: {
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 16,
    color: "#F7F6BB",
  },
  text: {
    margin: 24,
    fontSize: 58,
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    paddingVertical: 8, // Adjust padding instead of fixed height
    // paddingHorizontal: 10, // Add padding for horizontal space
    backgroundColor: '#114232',
  },
  buttonTxt: {
    color: '#F7F6BB',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
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
};

export default Home