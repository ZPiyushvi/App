// make a profile stats screen on app
// const { setCartItemsNEW,
//   setUserRole,
//   setVegMode,
//   setCartItems,
//   setCampusShops,
//   setCampusMenu,
//   setQuantity,
//   setUpdatedCartWithDetails,
//   setDateGroup,
//   setHistory,
//   setOutlets,
//   setOutletsNEW,
//   setUserData, fontFamilies, userData, vegMode } = useContext(GlobalStateContext);
// setUserData([]);
// setCartItemsNEW([]);
// setUserRole(null);
// setVegMode(false);
// setCartItems([]);
// setCampusShops([]);
// setCampusMenu([]);
// setQuantity(0);
// setUpdatedCartWithDetails([]);
// setDateGroup([]);
// setHistory([]);
// setOutlets([]);
// setOutletsNEW([]);
// setUserData([]);

import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
// import { colors } from "../utils/colors";
// import { fonts } from "../utils/fonts";

import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../Components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import FoodIcon from "../Components/FoodIcon";
import { ProfileScreenNav } from "../Data/ProfileScreenNav";

import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { GlobalStateContext } from "../Context/GlobalStateContext";
import Size from "../Components/Size";
import TextStyles from "../Style/TextStyles";
const ShimmerPlaceholder = createShimmerPlaceHolder(LinearGradient)

const LoginScreen = () => {
  // const route = useRoute();
  // const { userData } = route.params;
  const { setUserData, setDarkMode, darkMode, fontFamilies, userData, vegMode, setVegMode } = useContext(GlobalStateContext);

  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);

  const toggleVegMode = async () => {
    try {
      const newVegMode = !vegMode;
      if (!vegMode) {
        Alert.alert(
          "Switch to Veg Mode? 🌿",
          "You are about to filter the shops to show only those with pure vegetarian options and kitchens. Are you sure?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            {
              text: "Yes, Let's Go!",
              onPress: async () => {
                setVegMode(newVegMode);
                await AsyncStorage.setItem('vegMode', JSON.stringify(newVegMode));
              },
              style: "default"
            }
          ]
        );
      } else {
        setVegMode(newVegMode);
        await AsyncStorage.setItem('vegMode', JSON.stringify(newVegMode));
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleNavigation = async (screen) => {
    try {
      if (screen == 'LoginNavigationStack') {
        // AsyncStorage.setItem('token', "");
        // AsyncStorage.setItem('isLoggedIn', "");
        await AsyncStorage.clear();

        // setUserData([])
      }
      navigation.navigate(screen)
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  if (!fontFamilies) {
    return null;
  }

  // onPress={() => navigation.navigate('IndiviualCart',

  const [userDataVisible, setUserDataVisible] = useState(false);
  const [profileNavVisible, setProfileNavVisible] = useState(false);


  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        setUserDataVisible(true);
      }, 100);
    }

    if (ProfileScreenNav && ProfileScreenNav.length > 0) {
      setTimeout(() => {
        setProfileNavVisible(true);
      }, 300);
    }
  }, [userData, ProfileScreenNav]);

  const shimmerColors = [Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor, Colors.dark.colors.secComponentColor];

  const fontstyles = TextStyles();

  return (
    <>
      {/* mt-7 // marginextra */}
      <View className=' px-3 w-full justify-between' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
        <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />

        {userDataVisible && <View className='flex-row items-center pb-4'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.dark.colors.mainTextColor} />
          </TouchableOpacity>
          {/* <Text className='text-2xl font-black' style={{ color: Colors.dark.colors.mainTextColor }}>{TruncatedTextComponent(storeName, 21)}</Text> */}
        </View>}


        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={userDataVisible} className='w-full rounded-2xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.25, }}>
          <View className=' h-3/5 flex-row items-center'>
            <View className=' w-16 h-16 mx-3 rounded-full items-center justify-center' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerpleBG }}>
              <Text style={[fontstyles.h1, { marginBottom: -5, color: Colors.dark.colors.diffrentColorPerple }]}>
                {userData.name ? userData.name.substring(0, 1) : 'U'}
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>{userData.name ? userData.name : "UserName"}</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>{userData.name ? userData.contactinfo : "Contact details"}</Text>
              <View className=' -mt-1 flex-row items-center'>
                <Text className='underline' style={[fontstyles.h5, { color: Colors.dark.colors.diffrentColorOrange }]}>View activity</Text>
                <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} />
              </View>
            </View>
          </View>
          <View className=' h-2/5 flex-row p-3 items-center justify-between bg-black'>
            <View className='flex-row items-center'>
              <View className=' p-2 rounded-full' style={{ backgroundColor: 'rgba(244,230,83,0.3)' }}>
                <LinearGradient className=' p-1 rounded-full' colors={['#D79C08', '#F4E653', '#D79C08']}>
                  <Ionicons name='ribbon' size={24} color={'black'} />
                </LinearGradient>
              </View>

              {/* <LinearGradient className=' p-1 rounded-full' colors={['#D79C08', '#F4E653', '#D79C08']}> */}
              <Text className='text-[#D79C08]' style={[fontstyles.blackh2, {}]}>  Know Us</Text>
              {/* </LinearGradient> */}
            </View>
            <Ionicons name='chevron-forward' size={24} color={'#D79C08'} />
          </View>
        </ShimmerPlaceholder>
      </View>

      <ScrollView className='px-3 h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>

        <View className=' mt-3 px-2 flex-row justify-center'>
          {!userDataVisible ? <>
            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={userDataVisible} className='w-1/2 rounded-2xl overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15, }}>
              <View className=' p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                <Ionicons name='heart-outline' size={24} color={Colors.dark.colors.mainTextColor} />
              </View>
              <Text numberOfLines={1} ellipsizeMode='tail' className='absolute left-6 bottom-4' style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}>Favourites</Text>
            </ShimmerPlaceholder>

            <ShimmerPlaceholder shimmerColors={shimmerColors} visible={userDataVisible} className='w-1/2 rounded-2xl overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15, }}>
              <View className=' p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                <Ionicons name='bag-handle-outline' size={24} color={Colors.dark.colors.mainTextColor} />
              </View>
              <Text className='absolute left-6 bottom-4' style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}>Orders</Text>
            </ShimmerPlaceholder>
          </> : <>
            <View shimmerColors={shimmerColors} visible={userDataVisible} className='w-1/2 rounded-2xl overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15, }}>
              <View className=' p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                <Ionicons name='heart-outline' size={24} color={Colors.dark.colors.mainTextColor} />
              </View>
              <Text numberOfLines={1} ellipsizeMode='tail' className='absolute left-6 bottom-4' style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}>Favourites</Text>
            </View>

            <View shimmerColors={shimmerColors} visible={userDataVisible} className='w-1/2 rounded-2xl overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15, }}>
              <View className=' p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                <Ionicons name='bag-handle-outline' size={24} color={Colors.dark.colors.mainTextColor} />
              </View>
              <Text className='absolute left-6 bottom-4' style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}>Orders</Text>
            </View>
          </>}
        </View>

        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={profileNavVisible} className='rounded-xl mt-3 w-full' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
          <View className='p-3 items-center flex-row justify-between'>
            <View className='flex-row items-center'>
              <View>
                <FoodIcon style={{ backgroundColor: 'black', padding: 3 }} type={"PureVeg"} size={12} padding={2} />
              </View>
              <Text style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}> Veg Mode</Text>
            </View>
            <TouchableOpacity onPress={toggleVegMode}>
              <Ionicons name='toggle' size={38} style={{ transform: [{ rotate: vegMode ? '0deg' : '180deg' }] }} color={vegMode ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.mainTextColor} />
            </TouchableOpacity>
          </View>
        </ShimmerPlaceholder>

        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={profileNavVisible} className='rounded-xl mt-3 w-full' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
          <View className='p-3 items-center flex-row justify-between'>
            <View className='flex-row items-center'>
              <Text style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}> Dark Mode</Text>
            </View>
            <TouchableOpacity onPress={toggleDarkMode}>
              <Ionicons
                name='toggle' size={38} style={{ transform: [{ rotate: darkMode ? '0deg' : '180deg' }] }} color={darkMode ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.mainTextColor}
              />
            </TouchableOpacity>
          </View>
        </ShimmerPlaceholder>

        {ProfileScreenNav.map((section, sectionIndex) => {
          return (
            <View key={sectionIndex}>
              {!profileNavVisible && <ShimmerPlaceholder shimmerColors={shimmerColors} className='mt-3 h-14 rounded-xl w-full' />}
              <ShimmerPlaceholder className='mt-3 rounded-xl' shimmerColors={shimmerColors} visible={profileNavVisible}>

                <View className='rounded-xl p-3' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                  <View className=' items-center flex-row mb-3'>
                    <View className=' absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}> {section.title}</Text>
                  </View>

                  {section.data.map((item, itemIndex) => {
                    return (
                      <TouchableOpacity onPress={() => handleNavigation(item.navScreen)} key={itemIndex} className='my-2 flex-row items-center justify-between'>
                        <View className='flex-row items-center'>
                          <View className='p-1 rounded-full justify-center items-center' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                            <Ionicons name={item.iconName} size={22} color={Colors.dark.colors.mainTextColor} />
                          </View>
                          <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>  {item.subtitle}</Text>
                        </View>
                        <Ionicons name='chevron-forward-outline' size={23} color={Colors.dark.colors.mainTextColor} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ShimmerPlaceholder>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default LoginScreen;