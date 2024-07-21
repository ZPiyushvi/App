import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../Components/Colors';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useNavigation } from '@react-navigation/native';
import ModelScreen from '../Screen/ModelScreen';
import { mockCampusShops } from '../Data/mockCampusShops';
import { removeStoreFromCart } from './removeStoreFromCart';
import { GlobalStateContext } from '../Context/GlobalStateContext';

export const FirstStoreComponent = ({ updatedCartWithDetails, Modelshow, settype }) => {
  // const { CartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
  const navigation = useNavigation();
  const { outletsNEW, setCartItems, campusShops, setcampusShops, cartItemsNEW } = useContext(GlobalStateContext);

  const updatedCartWithDetailsLength = updatedCartWithDetails.length;

  console.log('Updated Cart Items:', JSON.stringify(updatedCartWithDetails, null, 2));

  // const { storeName, storeDetails, items, orders } = updatedCartWithDetails[updatedCartWithDetailsLength - 1];
  const Data = updatedCartWithDetails[updatedCartWithDetailsLength - 1];

  const totalPrice = Data.orders.reduce((acc, order) => acc + (parseInt(order.price) * order.quantity), 0);
  const totalItems = Data.orders.reduce((acc, order) => acc + order.quantity, 0);
  // const totalItems = items.reduce((total, item) => total + parseInt(item.quantity, 10), 0);

  const navToDetails = (item) => {
    navigation.navigate("Details", { Data: item });
  };

  return (
    <View key={Data.id}>
      {updatedCartWithDetailsLength - 1 != 0 ?
        <>
          <TouchableOpacity
            onPress={() => {
              settype('cart');
              Modelshow();
            }}
            className=' absolute flex-row rounded-full -mt-3 p-1 px-2 items-center z-50'
            style={{
              backgroundColor: Colors.dark.colors.componentColor,
              shadowColor: Colors.dark.colors.secComponentColor, // Replace with your desired glow color
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 5,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              justifyContent: 'center',
              alignItems: 'center',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -50 }, { translateY: -50 }],
            }}
          >
            <Text className='font-semibold text-base' style={{ color: Colors.dark.colors.diffrentColorOrange }}>+{updatedCartWithDetailsLength - 1} more </Text>
            <Ionicons name='caret-up' color={Colors.dark.colors.diffrentColorOrange} size={16} />
          </TouchableOpacity>
          <View
            // key={storeName}
            style={{
              backgroundColor: Colors.dark.colors.componentColor,
              shadowColor: Colors.dark.colors.secComponentColor, // Replace with your desired glow color
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 5,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.3)', // Adjust the color and opacity for a glowing border
            }}
            className=' rounded-xl p-4 mx-3 -my-6 flex-row'
          // style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
          />
        </>
        :
        null
      }
      <View
        key={cartItemsNEW.id}
        style={{
          height: Dimensions.get('window').height * 0.10,
          backgroundColor: Colors.dark.colors.componentColor,
          shadowColor: Colors.dark.colors.secComponentColor, // Replace with your desired glow color
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 10,
          elevation: 5,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)', // Adjust the color and opacity for a glowing border
          padding: Dimensions.get('window').width * 0.02,
        }}
        className=' rounded-xl flex-row items-center'
      // style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
      >
        <Image
          // source={require('./../Data/banner.jpg')}
          source={{
            uri: Data.image,
            method: 'POST',
            headers: {
              Pragma: 'no-cache',
            },
          }}
          defaultSource={require('./../../assets/favicon.png')}
          className=' w-12 h-12 rounded-full mr-2'
          alt="Logo"
        />
        <View style={{ width: Dimensions.get('window').width * 0.36 }}>
          <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-lg' numberOfLines={1} ellipsizeMode='tail'>
            {Data.name}
          </Text>
          <TouchableOpacity onPress={() => { navToDetails(outletsNEW.find(shop => shop.id === Data.id)) }} className=' flex-row items-center'>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: Colors.dark.colors.textColor }} className='font-semibold text-base underline'>
              View Full Menu
            </Text>
            <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} />
          </TouchableOpacity>
        </View>
        <View className='flex-row gap-x-1 absolute right-2 top-2 h-full'>
          <TouchableOpacity
            className='justify-center items-center rounded-lg m-1'
            style={{ width: Dimensions.get('window').width * 0.28, backgroundColor: Colors.dark.colors.diffrentColorOrange }}
            onPress={() => navigation.navigate('IndiviualCart', { item: Data })}
          >
            <View className='flex-row items-center justify-center'>
              <Text className='font-normal text-sm' style={{ color: Colors.dark.colors.mainTextColor }}>
                {/* {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0)} {' '}
                {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0) === 1 ? 'item' : 'items'} */}
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Text>
              <Ionicons
                style={{ transform: [{ rotate: '90deg' }], margin: -3 }}
                name="remove-outline"
                size={16}
                color={Colors.dark.colors.mainTextColor}
              />
              <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-normal text-sm'>
                ₹{totalPrice}
              </Text>
            </View>
            <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-base'>
              CheckOut
            </Text>
          </TouchableOpacity>
          <View style={{ width: Dimensions.get('window').width * 0.08 }} className=' items-center justify-center'>
            <TouchableOpacity
              onPress={() => removeStoreFromCart(storeName, setCartItems, campusShops, setcampusShops)}
              className=' rounded-full p-1 items-center justify-center'
              style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
            >
              <Ionicons
                name="add-outline"
                style={{ transform: [{ rotate: '45deg' }] }}
                size={18}
                color={Colors.dark.colors.mainTextColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};