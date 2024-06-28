import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
// import { colors } from "../utils/colors";
// import { fonts } from "../utils/fonts";

import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../Components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import TruncatedTextComponent from "../Components/TruncatedTextComponent";
import FoodIcon from "../Components/FoodIcon";

const Data_More = [
  {
    "title": "Personal",
    "data": [
      {
        "subtitle": "Your Wallet",
        "iconName": "wallet-outline",
      },
      {
        "subtitle": "Your Stats",
        "iconName": "stats-chart-outline",
      }
    ]
  },
  {
    "title": "Food & Orders",
    "data": [
      {
        "subtitle": "Address Book",
        "iconName": "reader-outline",
      },
      {
        "subtitle": "Favorite Orders",
        "iconName": "heart-outline",
      },
      {
        "subtitle": "Your Orders",
        "iconName": "cart-outline",
      },
      {
        "subtitle": "Order History",
        "iconName": "time-outline",
      }
    ]
  },
  {
    "title": "Updates & Feedback",
    "data": [
      {
        "subtitle": "New Updates",
        "iconName": "newspaper-outline",
      },
      {
        "subtitle": "About",
        "iconName": "information-circle-outline",
      },
      {
        "subtitle": "Send Feedback",
        "iconName": "chatbox-ellipses-outline",
      },
      {
        "subtitle": "Report a Safety Emergency",
        "iconName": "warning-outline",
      }
    ]
  },
  {
    "title": "Settings",
    "data": [
      {
        "subtitle": "Settings",
        "iconName": "cog-outline",
      },
      {
        "subtitle": "Logout",
        "iconName": "power-outline",
      },
      {
        "subtitle": "Privacy Policy",
        "iconName": "lock-closed-outline",
      },
      {
        "subtitle": "Terms of Service",
        "iconName": "document-text-outline",
      }
    ]
  },
];

const LoginScreen = () => {
  const route = useRoute();
  const { userData } = route.params;

  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);

  const [vegMode, setVegMode] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    AsyncStorage.setItem('token', "");
    AsyncStorage.setItem('isLoggedIn', "");
    // navigation.navigate("StaterScreen");
    navigation.navigate("LoginScreen");
  };

  return (
    <>
      <View className=' px-3 pt-8 w-full justify-between' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
        <View className='flex-row items-center pb-4'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.dark.colors.mainTextColor} />
          </TouchableOpacity>
          {/* <Text className='text-2xl font-black' style={{ color: Colors.dark.colors.mainTextColor }}>{TruncatedTextComponent(storeName, 21)}</Text> */}
        </View>


        <View className='w-full rounded-2xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.25, }}>
          <View className=' h-3/5 flex-row items-center'>
            <View className=' w-20 h-20 mx-3 pt-1 rounded-full items-center justify-center' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerpleBG }}>
              <Text className='text-4xl font-black' style={{ color: Colors.dark.colors.diffrentColorPerple }}>
                {userData.name ? userData.name.substring(0, 1) : 'U'}
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} ellipsizeMode='tail' className='text-2xl font-black' style={{ color: Colors.dark.colors.mainTextColor }}>{userData.name ? userData.name : "UserName"}</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' className='font-bold text-xl' style={{ color: Colors.dark.colors.textColor }}>{userData.name ? userData.contactinfo : "Contact details"}</Text>
              <View className=' flex-row items-center'>
                <Text className='font-medium text-base underline' style={{ color: Colors.dark.colors.diffrentColorOrange }}>View activity</Text>
                <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} />
              </View>
            </View>
          </View>
          <View className=' h-2/5 flex-row' style={{ backgroundColor: Colors.dark.colors.textColor }}>
            <Ionicons name='ribbon-outline' size={24} color={Colors.dark.colors.mainTextColor} />
          </View>
        </View>
      </View>

      <ScrollView className='px-3 h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>

        <View className=' mt-3 px-2 flex-row justify-center'>
          <View className='w-1/2 rounded-2xl overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15, }}>
            <View className=' p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
              <Ionicons name='heart-outline' size={24} color={Colors.dark.colors.mainTextColor} />
            </View>
            <Text numberOfLines={1} ellipsizeMode='tail' className='absolute left-6 bottom-4 font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Favourites</Text>
          </View>

          <View className='w-1/2 rounded-2xl overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15, }}>
            <View className=' p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
              <Ionicons name='bag-handle-outline' size={24} color={Colors.dark.colors.mainTextColor} />
            </View>
            <Text className='absolute left-6 bottom-4 font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Orders</Text>
          </View>
        </View>

        <View className=' mt-3 rounded-xl p-3 items-center flex-row justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
          <View className='flex-row items-center'>
            <View>
              <FoodIcon style={{ backgroundColor: 'black', padding: 3 }} type={"Veg"} size={12} padding={2} />
            </View>
            <Text className='font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> Veg Mode</Text>
          </View>
          <TouchableOpacity onPress={() => setVegMode(!vegMode)}>
            <Ionicons name='toggle' size={38} style={{ transform: [{ rotate: vegMode ? '0deg' : '180deg' }] }} color={vegMode ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.mainTextColor} />
          </TouchableOpacity>
        </View>

        {Data_More.map((section, sectionIndex) => {
          return (
            <View key={sectionIndex} className='mt-3 rounded-xl p-3' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
              <View>
                <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-xl mb-3' style={{ color: Colors.dark.colors.mainTextColor }}>{section.title}</Text>
              </View>

              {section.data.map((item, itemIndex) => {
                return (
                  <TouchableOpacity key={itemIndex} className='my-2 flex-row items-center justify-between'>
                    <View className='flex-row items-center'>
                      <View className='p-1 rounded-full justify-center items-center' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                        <Ionicons name={item.iconName} size={22} color={Colors.dark.colors.mainTextColor} />
                      </View>
                      <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>  {item.subtitle}</Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={23} color={Colors.dark.colors.mainTextColor} />
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}

        <View className=' p-4 mt-6 h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
          <TouchableOpacity className='inputContainer flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full'
            style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.diffrentColorOrange }}
            onPress={handleSignup}
          >
            <Text className=' text-lg font-black' style={{ color: Colors.dark.colors.mainTextColor }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginScreen;