import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import FoodIcon from '../Components/FoodIcon';
import Colors from '../Components/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useNavigation } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { removeStoreFromCart } from '../Components/removeStoreFromCart';

const Cart = ({ route }) => {
  const { storeName, items, totalPrice, storeDetails } = route.params;
  const { setCartItems, campusShops, setcampusShops, History, setHistory } = useContext(GlobalStateContext);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 6);

  function getFormattedDate(dateObj) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayName = days[dateObj.getDay()];
    const monthName = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    }

    return `${dayName}, ${monthName} ${day}${suffix(day)} ${year}`;
  }

  // console.log(storeName, items, totalPrice, storeDetails)
  const navigation = useNavigation();

  function calculateTotalQuantity(items) {
    let totalQuantity = 0;
    items.forEach(item => {
      totalQuantity += parseInt(item.quantity);
    });
    return totalQuantity;
  }

  const renderItem = ({ item, index }) => (
    <View key={`${index}-${item.name}`} className='p-3 py-6 overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
      <View className='flex-row items-center' >
        {
          item.type &&
          <FoodIcon style={{ backgroundColor: 'black' }} type={item.type} size={8} padding={2} />
        }
        <View>
          <Text className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>{TruncatedTextComponent(item.item, 20)}</Text>
          <Text className='font-normal text-sm' style={{ color: Colors.dark.colors.textColor }}>Quantity: {item.quantity} * ₹{item.price}</Text>
        </View>
      </View>



      <View className='absolute top-3 right-3 items-end'>
        <View
          style={[styles.button, { backgroundColor: Colors.dark.colors.componentColor, borderColor: Colors.dark.colors.textColor, borderWidth: 1 }]}
          className='h-8 w-20 flex-row overflow-hidden mb-1'
        >
          {item.quantity > 0 ? (
            <>
              <TouchableOpacity className='z-10 left-0 absolute w-6/12 items-center'>
                <Ionicons color={Colors.dark.colors.textColor} name={'remove'} size={16} />
              </TouchableOpacity>
              <Text className=' uppercase text-base font-black text-center' style={{ color: Colors.dark.colors.diffrentColorGreen }}>{item.quantity}</Text>
              <TouchableOpacity className='z-10 right-0 absolute w-6/12 items-center'>
                <Ionicons color={Colors.dark.colors.textColor} name={'add'} size={16} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.colors.diffrentColorGreen }]} onPress={() => { handleIncrement(item.id, title, item.item, data.name) }}>
                <Text className=' uppercase text-base font-black' style={{ color: Colors.dark.colors.diffrentColorGreen }}>Add</Text>
              </TouchableOpacity>
              <Text className=' top-0 right-2 absolute text-base font-medium' style={{ color: Colors.dark.colors.diffrentColorGreen }}>+</Text>
            </>
          )}
        </View>
        <Text className='font-normal text-sm' style={{ color: Colors.dark.colors.mainTextColor }}>₹{item.price * item.quantity}</Text>
      </View>
    </View>
  );

  const renderItem2 = ({ item, index }) => (
    <View key={`${index}-${item.name}`} className='py-3 pl-3 overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
      <View className='flex-row w-full' >
        {/* {console.log(item.image)} */}
        <View className=' w-3/12'>
          <ImageBackground
            source={{
              uri: item.image,
              method: 'POST',
              headers: {
                Pragma: 'no-cache',
              },
            }}
            defaultSource={require('./../../assets/favicon.png')}
            resizeMode="cover"
            alt="Logo"
            className='w-full h-20 border-2 rounded-lg overflow-hidden border-slate-950'
            style={{ borderWidth: 2, borderColor: Colors.dark.colors.secComponentColor }}
          />
        </View>
        <View className=' w-9/12 px-3'>
          <Text className='font-black text-base' numberOfLines={1} ellipsizeMode='tail' style={{ color: Colors.dark.colors.mainTextColor }}>{item.item}</Text>
          <Text className='font-normal text-sm' style={{ color: Colors.dark.colors.textColor }}>Quantity: {item.quantity} * ₹{item.price}</Text>
          <View className=' flex-row justify-between w-full '>
            <View className='flex-1 justify-end'>
              <Text className='font-normal text-base' style={{ color: Colors.dark.colors.mainTextColor }}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
            <View
              style={[styles.button, { backgroundColor: Colors.dark.colors.componentColor, borderColor: Colors.dark.colors.textColor, borderWidth: 1 }]}
              className='h-8 w-20  flex-row overflow-hidden mb-1'
            >
              {item.quantity > 0 ? (
                <>
                  <TouchableOpacity className='z-10 left-0 absolute w-6/12 items-center'>
                    <Ionicons color={Colors.dark.colors.textColor} name={'remove'} size={16} />
                  </TouchableOpacity>
                  <Text className=' uppercase text-base font-black text-center' style={{ color: Colors.dark.colors.diffrentColorGreen }}>{item.quantity}</Text>
                  <TouchableOpacity className='z-10 right-0 absolute w-6/12 items-center'>
                    <Ionicons color={Colors.dark.colors.textColor} name={'add'} size={16} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.colors.diffrentColorGreen }]} onPress={() => { handleIncrement(item.id, title, item.item, data.name) }}>
                    <Text className=' uppercase text-base font-black' style={{ color: Colors.dark.colors.diffrentColorGreen }}>Add</Text>
                  </TouchableOpacity>
                  <Text className=' top-0 right-2 absolute text-base font-medium' style={{ color: Colors.dark.colors.diffrentColorGreen }}>+</Text>
                </>
              )}
            </View>

          </View>
        </View>

      </View>
    </View>
  );


  return (
    // View style={{backgroundColor: Colors.dark.colors.backGroundColor}}
    <View className='h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
      <View className=' p-3 pt-8 flex-row items-center w-full justify-between' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
        <View className='flex-row items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
            <Ionicons name="chevron-back-outline" size={24} color={Colors.dark.colors.mainTextColor} />
          </TouchableOpacity>
          <Text className='text-2xl font-black' style={{ color: Colors.dark.colors.mainTextColor }}>{TruncatedTextComponent(storeName, 21)}</Text>
        </View>
        <TouchableOpacity className='p-2'>
          <Ionicons name="arrow-redo-outline" size={24} color={Colors.dark.colors.mainTextColor} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className=' p-5 h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>

          <View className=' mb-5 rounded-xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
            <View className='p-3 flex-row' >
              <Ionicons name="bag-check-outline" size={24} color={Colors.dark.colors.mainTextColor} />
              <View className=' ml-3 flex-row'>
                <Text className='font-medium text-base' style={{ color: Colors.dark.colors.mainTextColor }}>You have </Text>
                <Text className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>
                  {calculateTotalQuantity(items)} {calculateTotalQuantity(items) > 1 ? 'items' : 'item'}
                </Text>
                <Text className='font-medium text-base' style={{ color: Colors.dark.colors.mainTextColor }}> in your list</Text>
              </View>
            </View>
          </View>

          <View className=' rounded-xl overflow-hidden'>
            {/* <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(items) => `${items.id}-${items.item}`}
            /> */}
            {/* {console.log(items.item)} */}
            {items.map((menu, index) => (
              renderItem2({ item: menu, index: index })
              // console.log(items[index])
            ))}
          </View>

          <View className=' mt-5 rounded-xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
            <View className='p-3 flex-row' >
              <Ionicons name="timer-outline" size={24} color={Colors.dark.colors.mainTextColor} />
              <View className=' ml-3 flex-row'>
                <Text className='font-medium text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Average Time is </Text>
                <Text className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>20 mins</Text>
              </View>
            </View>

            <View className='p-3'>
              <View className='flex-row' >
                <Ionicons name="receipt-outline" size={24} color={Colors.dark.colors.mainTextColor} />
                <View className=' ml-3'>
                  <View className='flex-row'>
                    <Text className='font-medium text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Total Bill </Text>
                    <Text className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>₹{totalPrice}</Text>
                  </View>
                  <Text className='font-medium text-base' style={{ color: Colors.dark.colors.textColor }}>Incl. taxes, charges & donation</Text>
                </View>
              </View>
              <View className='absolute top-3 right-3 items-end'>
                <Ionicons name="chevron-forward-outline" size={24} color={Colors.dark.colors.mainTextColor} />
              </View>
            </View>
          </View>

          <View className='mt-4 mb-24'>
            <Text className='font-semibold text-xl spacing tracking-[4]' style={{ color: Colors.dark.colors.textColor }}>CANCELLATION POLICY</Text>
            <Text className='mt-1 font-medium text-sm' style={{ color: Colors.dark.colors.textColor }}>
              Help us reduce food waste by avoiding cancellations after placing your order. A 100% cancellation fee will be applied.
            </Text>
          </View>

        </View>


      </ScrollView>

      <View className=' p-5 rounded-t-2xl flex-row items-center w-full justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
        <View>
          <Text className='text-xl font-black' style={{ color: Colors.dark.colors.diffrentColorOrange }}>₹{totalPrice}</Text>
          <Text className='font-medium text-base' style={{ color: Colors.dark.colors.textColor }}>View Detailed Bill</Text>
        </View>
        <TouchableOpacity
          onPress={() => { removeStoreFromCart(storeName, setCartItems, campusShops, setcampusShops), setHistory(prevHistory => [...prevHistory, { items: items, storeDetails: storeDetails, totalPrice: totalPrice, Noformatdate: today, date: getFormattedDate(today)}]), navigation.navigate("HomeScreen") }}
          className=' p-3 flex-row justify-center items-center rounded-xl' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange, width: Dimensions.get('window').width * 0.53 }}>
          <Text className='text-xl font-black' style={{ color: Colors.dark.colors.mainTextColor }}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 8, // Adjust padding instead of fixed height
    // paddingHorizontal: 10, // Add padding for horizontal space
    // backgroundColor: '#114232',
  },
  foodItemCollectionContainer: {
    marginHorizontal: Dimensions.get('window').width * 0.07,
    marginTop: Dimensions.get('window').height * 0.02,
    gap: Dimensions.get('window').width * 0.04,
    // backgroundColor: 'white',
    borderRadius: 18,
  },
  shadowProp: {
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.00,
    elevation: 30,

  },
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#fff',
  },
  storeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Cart;
