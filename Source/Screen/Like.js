import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import Colors from '../Components/Colors';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useNavigation } from '@react-navigation/native';

const Like = () => {
  const { CartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
  const navigation = useNavigation();

  return (
    <View className=' h-full justify-center p-3' style={[styles.container, { backgroundColor: Colors.dark.colors.backGroundColor }]}>
      {updatedCartWithDetails.map(({ storeName, storeDetails, items, totalPrice }) => (
        <View
          key={storeName}
          className=' rounded-xl p-2 mt-3 flex-row'
          style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
        >
          {console.log("Like", storeDetails)}
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
            <Text style={{ color: Colors.dark.colors.textColor }} className='font-semibold text-base underline'>
              View Full Menu
            </Text>
          </View>
          <View className='flex-row gap-x-3 absolute right-2 top-2 h-full'>
            <TouchableOpacity
              className='px-2 justify-center items-center rounded-lg'
              style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }}
              onPress={() => navigation.navigate('IndiviualCart', { storeName, items, totalPrice, storeDetails})}
            >
              <View className='flex-row items-center justify-center'>
                <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-normal text-sm'>
                  {items.length} items
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
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // backgroundColor: '#fff',
  },
  storeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Like;