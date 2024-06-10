import { BANNER_H } from "./../Constants/Constants"
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SlideContainor from "../Components/SlideContainor";
import { mockCampusShops } from "../Data/mockCampusShops";
import { mockCampusMenu } from "../Data/mockCampusMenu";
import PopularMenuContainor from "../Components/PopularMenuContainor";

const Cart = () => {
  const scrollA = useRef(new Animated.Value(0)).current;

  const [verticalScrollHeight, setVerticalScrollHeight] = useState(0);
  const { colors } = useTheme();
  const [campusShops, setcampusShops] = useState([]);
  const [campusMenu, setcampusMenu] = useState([]);
  const flatListRef = useRef(null);
  const flatListMenuRef = useRef(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    setcampusShops(mockCampusShops);
    setcampusMenu(mockCampusMenu);
  };

  const featuredData = campusShops.filter(item => item.featured === "true");
  const popularMenu = campusMenu.filter(item => item.popular === "true");

  const renderFoodItemContainer = ({ item }) => (
    <View style={styles.foodItemCollectionContainer}>
      <View style={styles.foodItemBodyContainer}>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text style={styles.txt}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const viewabilityMenuConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyBGContainer} />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        keyboardDismissMode='on-drag'
      >

        <View className='staticContainer align-middle flex w-1/2'>
          <Animated.View style={[styles.banner(scrollA)]}>
            <View style={styles.searchContainer}>
              <TextInput placeholder='Search' style={styles.searchInputTxt} />
              <Ionicons name="search" size={24} style={styles.searchIcon} />
            </View>
            <SlideContainor flatListRef={flatListRef} data={featuredData} viewabilityConfig={viewabilityMenuConfig} />
            <ScrollView horizontal>
              {campusMenu.map(item => (
                <View key={item.id}>
                  <View style={styles.foodItemCollectionContainer}>
                    <TouchableOpacity>
                      <View style={styles.foodItemContainer}>
                        <Text>{item.name}</Text>
                      </View>
                      <View>
                        <Text>{item.name}</Text>
                        <Text>{item.price}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
        <View style={styles.verticalScrollContainer}>
          <Text>Hello</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  
  foodItemCollectionContainer: {
    marginHorizontal: Dimensions.get('window').width * 0.03, // should be applyed to all fixed items
    marginTop: Dimensions.get('window').height * 0.02, // should be applyed to all fixed items
    height: Dimensions.get('window').height * 0.40,
    gap: Dimensions.get('window').width * 0.04,
    // justifyContent: 'space-between', // can be also appled
  },
  foodItemContainer: {
    backgroundColor: "#114232", // bg color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  txt: {
    color: '#40A578'
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "#40A578"
  },
  bodyBGContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height * 0.3,
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#FCDC2A",
  },
  searchContainer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    marginHorizontal: Dimensions.get('window').width * 0.03,
  },
  searchInputTxt: {
    width: '78%',
    backgroundColor: '#e2c625',
    borderRadius: 14,
    paddingLeft: 14,
    textAlignVertical: 'center',
    fontSize: 16,
  },
  searchIcon: {
    backgroundColor: '#e2c625',
    borderRadius: 15,
    width: 60,
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  verticalScrollContainer: {
    minHeight: Dimensions.get('window').height * 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    backgroundColor: '#114232',
  },
  banner: scrollA => ({
    height: BANNER_H,
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H],
          outputRange: [-0, 0, BANNER_H * 0.99, -BANNER_H * 0.5],
        }),
      },
    ],
  }),
});

export default Cart;
