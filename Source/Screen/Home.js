import { BANNER_H } from "./../Constants/Constants"
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SlideContainor from "../Components/SlideContainor";
import { mockCampusShops } from "../Data/mockCampusShops";
import { mockCampusMenu } from "../Data/mockCampusMenu";
import PopularMenuContainor from "../Components/PopularMenuContainor";
import Content from "../Components/Content";
import Titles from "../Components/Titles";

const Cart = () => {
  const navigation = useNavigation();

  const scrollA = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  const [campusShops, setcampusShops] = useState([]);
  const [campusMenu, setcampusMenu] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

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

  const featuredData = campusShops.filter(item => item.featured === "true");
  const popularMenu = campusMenu.filter(item => item.popular === "true");

  const viewabilityMenuConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View className='bodyContainer w-full bg-[#40A578] flex'>
      <View className='bodyBGContainer bg-[#FCDC2A] absolute w-full rounded-b-3xl' style={{ height: Dimensions.get('window').height * 0.3 }} />
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

            <View className='searchBodyContainer mt-14 flex-row justify-between' style={{ height: 60, marginHorizontal: Dimensions.get('window').width * 0.03 }}>
              <TextInput placeholder='Search' className='searchInputTxt bg-[#e2c625] rounded-xl w-[78%] text-base pl-3' />
              <Ionicons name="search" size={24} className='searchIcon' style={{ backgroundColor: '#e2c625', borderRadius: 15, width: 60, height: 60, textAlign: 'center', textAlignVertical: 'center' }} />
            </View>

            <SlideContainor flatListRef={flatListRef} data={featuredData} viewabilityConfig={viewabilityMenuConfig} />

            <Titles title={"What’s on your heart?"} width={25} />
            <PopularMenuContainor data={popularMenu} />

          </Animated.View>

        </View>

        <View style={styles.verticalScrollContainer}>

          <Titles title={"All Restaurants"} width={60} />
          <Content data={campusShops} />

        </View>

      </Animated.ScrollView>
    </View>
  );
};

const styles = {

  line: {
    width: 60,
    height: 1,
    backgroundColor: '#D1D5DB', // Equivalent to bg-gray-200
  },

  txt: {
    color: '#40A578'
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: "#40A578" // bg color
  },
  bodyBGContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height * 0.3,
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#FCDC2A", // bg color
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
    // marginTop: Dimensions.get('window').height * 0.6,
    // minHeight: Dimensions.get('window').height * 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: '#114232', // bg color
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

export default Cart