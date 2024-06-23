import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import Colors from '../Components/Colors';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useNavigation } from '@react-navigation/native';
import ModelScreen from '../Screen/ModelScreen';

export const FirstStoreComponent = ({ updatedCartWithDetails, Modelshow }) => {
  // const { CartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
  const navigation = useNavigation();

  const updatedCartWithDetailsLength = updatedCartWithDetails.length;
  const { storeName, storeDetails, items, totalPrice } = updatedCartWithDetails[updatedCartWithDetailsLength - 1];
  const totalItems = items.reduce((total, item) => total + parseInt(item.quantity, 10), 0);

  return (
    <View>
      {updatedCartWithDetailsLength - 1 != 0 ?
        <>
          <TouchableOpacity
            onPress={Modelshow}
            className=' absolute flex-row rounded-full mt-2 p-1 px-2 items-center z-50'
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
            key={storeName}
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
            className=' rounded-xl p-5 m-3 flex-row'
          // style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
          />
        </>
        :
        null
      }
      <View
        key={storeName}
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
        className=' rounded-xl p-2 -mt-10 flex-row'
      // style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
      >
        {/* {console.log("Like", storeDetails)} */}
        <Image
          // source={require('./../Data/banner.jpg')}
          source={{
            uri: storeDetails.image,
            method: 'POST',
            headers: {
              Pragma: 'no-cache',
            },
          }}
          className=' w-12 h-12 rounded-full mr-2'
          alt="Logo"
        />
        <View>
          <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-lg'>
            {TruncatedTextComponent(storeName, 13)}
          </Text>
          <View className=' flex-row items-center'>
            <Text style={{ color: Colors.dark.colors.textColor }} className='font-semibold text-base underline'>
              View Full Menu
            </Text>
            <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} />
          </View>
        </View>
        <View className='flex-row gap-x-2 absolute right-2 top-2 h-full'>
          <TouchableOpacity
            className='justify-center items-center rounded-lg'
            style={{ width:Dimensions.get('window').width * 0.3, backgroundColor: Colors.dark.colors.diffrentColorOrange }}
            onPress={() => navigation.navigate('IndiviualCart', { storeName, items, totalPrice, storeDetails })}
          >
            <View className='flex-row items-center justify-center'>
              <Text className='font-normal text-sm' style={{ color: Colors.dark.colors.mainTextColor }}>
                {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0)} {' '}
                {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0) === 1 ? 'item' : 'items'}
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
          <View className=' items-center justify-center'>
            <TouchableOpacity
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