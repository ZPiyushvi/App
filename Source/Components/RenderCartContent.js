// RenderCartItem.js
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TruncatedTextComponent from './TruncatedTextComponent';
import Colors from './Colors';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { removeStoreFromCart } from './removeStoreFromCart';
import { mockCampusShops } from '../Data/mockCampusShops';

const RenderCartItem = ({ item, setVisible, navigation }) => {
  // const { cartItemsNEW, outletsNEW, storeName, storeDetails, items } = item;
  const { outletsNEW, setCartItems, campusShops, setcampusShops, setCartItemsNEW } = useContext(GlobalStateContext);

  const navToDetails = (item) => {
    setVisible(false);
    navigation.navigate("Details", { Data: item });
  };

  const totalPrice = item.orders.reduce((acc, order) => acc + (parseInt(order.price) * order.quantity), 0);
  const totalItems = item.orders.reduce((acc, order) => acc + order.quantity, 0);

  return (
    <View
      key={item.id}
      className='rounded-xl p-2 mb-3 flex-row'
      style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
    >
      <Image
        source={{
          uri: item.image,
          method: 'POST',
          headers: {
            Pragma: 'no-cache',
          },
        }}
        defaultSource={require('./../../assets/favicon.png')}
        className='w-12 h-12 rounded-full mr-2'
        alt="Logo"
      />
      <View>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-lg'>
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => navToDetails(outletsNEW.find(shop => shop.id === item.id))} className='flex-row items-center'>
          <Text style={{ color: Colors.dark.colors.textColor }} className='font-semibold text-base underline'>
            View Full Menu
          </Text>
          <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} />
        </TouchableOpacity>
      </View>
      <View className='flex-row gap-x-2 absolute right-2 top-2 h-full'>
        <TouchableOpacity
          className='justify-center items-center rounded-lg'
          style={{ width: Dimensions.get('window').width * 0.3, backgroundColor: Colors.dark.colors.diffrentColorOrange }}
          onPress={() => {
            setVisible(false);
            navigation.navigate('IndiviualCart', { item });
          }}
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
        <View className='items-center justify-center'>
          <TouchableOpacity
            onPress={() => removeStoreFromCart(item.name, setCartItemsNEW)}
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
      </View>
    </View>
  );
};

export default RenderCartItem;