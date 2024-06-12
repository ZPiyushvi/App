import { BANNER_H } from "./../Constants/Constants"
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SlideContainor from "../Components/SlideContainor";
import { mockCampusShops } from "../Data/mockCampusShops";
import { mockCampusMenu } from "../Data/mockCampusMenu";
import PopularMenuContainor from "../Components/PopularMenuContainor";
import FoodIcon from "../Components/FoodIcon";
import FoodTypeIcon from "../Components/FoodTypeIcon";

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
    <View style={styles.container}>

      <View className=' overflow-hidden' style={styles.modalContent}>

        <TouchableOpacity style={{ zIndex: 1 }} onPress={() => setOpenmodal(true)}>
          <Ionicons name="close-circle" size={42} color={'white'} style={{ position: 'absolute', right: 12, top: 12 }} />
        </TouchableOpacity>

        {/* <View className=' h-96 w-full rounded-xl p-3 bg-slate-200'> */}
        <Image
          source={{
            uri: "https://www.iitgn.ac.in/student/lifeoncampus/facilities/images/thumb/teapost.jpg",
            method: 'POST',
            headers: {
              Pragma: 'no-cache',
            },
          }}
          className=' h-72 w-full'
          // style={styles.popularFeatureImage}
          alt="Logo"
        />

        <View className=' p-4'>
          <View className='flex-row'>
            <FoodIcon type="Veg" size={16} padding={2} />
            
            <FoodTypeIcon type="Spicy" size={18} padding={6} />

          </View>

          <View className=' py-3'>
            <View className=' flex-row justify-between'>
              <View>
                <Text className=' text-xl font-bold'>Item Name</Text>
                {/* <Text className=' text-lg font-medium'>Item Name</Text> */}
              </View>
              <View className=' flex-row gap-3'>
                <TouchableOpacity className=' rounded-full border-2 p-1'>
                  <Ionicons name="heart-outline" size={20} color={'red'} />
                </TouchableOpacity>
                <TouchableOpacity className=' rounded-full border-2 p-1'>
                  <Ionicons name="arrow-redo-outline" size={20} color={'blue'} />
                </TouchableOpacity>
              </View>
            </View>
            <Text className=' text-lg font-medium'>Item Name</Text>
            <Text className=' text-base font-normal'>Item Name</Text>
          </View>

          <View className=' flex-row justify-between'>
            <TouchableOpacity className=' rounded-lg items-center justify-center w-[33%] py-3 px-10 bg-green-600' onPress={() => setOpenmodal(false)}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity className=' rounded-lg items-center justify-center w-[63%] py-3 px-10 bg-green-600' onPress={() => setOpenmodal(false)}>
              <Text style={styles.buttonText}>Add item 99</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    // color: colors.text,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },

  modalContent: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    // borderColor: colors.text,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    // height: Dimensions.get('window').height * 0.57,
    // alignItems: "center",
    backgroundColor: "white",
    // opacity: 0.9,
  },

  itemContainer: {
    // marginTop: "7%",
    marginBottom: "5%",
    flexDirection: "row",
    height: "51%",
    gap: 16,
  },

  itemTouchable: {
    width: "28%",
    gap: 0.2,
  },

  planBox: {
    height: "55%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  planText: {
    color: "black",
    fontWeight: "800",
    fontSize: 21,
  },

  priceBox: {
    height: "55%",
    backgroundColor: "grey",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  priceText: {
    color: "black",
    fontWeight: "800",
    fontSize: 21,
  },

  priceDetailText: {
    color: "black",
    fontWeight: "500",
    fontSize: 13,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12
  },

  button: {
    borderRadius: 8,
    height: 50,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: "center",
  },

  buttonText: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    // letterSpacing: 1,
    // textDecorationLine: "underline",
  },
  popularFeatureImage: {
    // resizeMode: 'contain',
    height: '100%',
    width: '57%', // Adjust width for responsiveness
    borderWidth: 2,
    borderColor: '#114232', // border color
    borderRadius: 14,
  },
}


export default Cart;
