import { View, Text, TouchableOpacity, StatusBar, ImageBackground, StyleSheet, Dimensions, ScrollView, Platform, Button, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Colors from '../Components/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";
import Icons from '../Components/Icons'
import { GlobalStateContext } from '../Context/GlobalStateContext'
import TextStyles from '../Style/TextStyles'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { API_BASE_URL, CHANGEORDERSTATUS_ENDPOINT, ORDERSBUYER_ENDPOINT } from '../Constants/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';


const { StarIcon, CarIcon } = Icons();


// const ListCard_Self2 = ({ item, onShowDetails, showDetails }) => {
//   const navigation = useNavigation();

//   const navToDetails = (item) => {
//     navigation.navigate("Details", { Data: item });
//   };
//   return (
//     <TouchableOpacity >
//       <View className='flex-row drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
//         <LinearGradient
//           start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
//           colors={['transparent', Colors.dark.colors.backGroundColor]}
//           className=' -ml-1 flex-1 flex-row px-3 py-2 items-center'
//         >
//           <View className=' w-2/5 h-32 rounded-xl overflow-hidden'>
//             <ImageBackground
//               // source={require('./../Data/banner.jpg')}
//               source={{
//                 uri: item.storeDetails.image,
//                 method: 'POST',
//                 headers: {
//                   Pragma: 'no-cache',
//                 },
//               }}
//               defaultSource={require('./../../assets/store.jpg')}
//               className=' w-full h-full mr-2'
//               alt="Logo"
//             >
//               <LinearGradient
//                 start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
//                 className='overflow-hidden h-full w-full'
//                 colors={['transparent', Colors.dark.colors.backGroundColor]}
//               />
//               <View className='absolute bottom-2 right-2'>
//                 <View className='flex-row justify-center items-center'>
//                   {
//                     item.storeDetails.type === "PureVeg" &&
//                     <>
//                       <Text style={[{ color: '#00e676' }]} className='text-base font-semibold mr-1'>Pure {item.type}</Text>
//                       <Ionicons name="leaf" size={16} color={'#00e676'} />
//                     </>
//                   }
//                 </View>
//               </View>
//             </ImageBackground>
//           </View>
//           <View className=' ml-2'>
//             <Text numberOfLines={1} ellipsizeMode='middle' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>
//               {item.storeDetails.name}
//             </Text>
//             <View className='flex-row items-center' >
//               <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm '>{item.storeDetails.type}</Text>
//               {/* <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
//               <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm'>{item.storeDetails.menutype}</Text> */}
//               <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
//               <Text style={{ color: Colors.dark.colors.diffrentColorPerple }} className='text-sm'>{item.storeDetails.location}</Text>
//             </View>
//             <View className='flex-row py-2'>
//               <View className=' px-4 rounded-md bg-black' style={{ paddingVertical: 8, borderWidth: 0, borderColor: Colors.dark.colors.diffrentColorOrange }}>
//                 <Text className='font-light text-base' style={{ color: Colors.dark.colors.textColor }}>
//                   <Text className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>
//                     {item.items.length} {item.items.length > 1 ? 'items' : 'item'}
//                   </Text>
//                 </Text>
//               </View>

//               <View className='flex-row ml-2 items-center'>
//                 <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>₹</Text>
//                 <Text className='font-light text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> {item.totalPrice}</Text>
//               </View>
//             </View>
//           </View>
//         </LinearGradient>

//         <View className=' p-3' />
//         <TouchableOpacity className=' absolute right-2 bottom-2' onPress={onShowDetails}>
//           <Ionicons name={showDetails ? "chevron-up-outline" : "chevron-down-outline"} size={28} color={Colors.dark.colors.textColor} />
//         </TouchableOpacity>

//       </View>
//     </TouchableOpacity>
//   );
// }

// const ListCard_Self3 = ({ item }) => {
//   const navigation = useNavigation();
//   const navToDetails = (item) => {
//     navigation.navigate("Details", { Data: item });
//   };
//   return (
//     <TouchableOpacity activeOpacity={1} >
//       <View className='flex-row drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
//         <LinearGradient
//           start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
//           colors={['transparent', Colors.dark.colors.backGroundColor]}
//           className=' -ml-1 flex-1'
//         >
//           <View className='p-3 flex-row'>
//             <View className=' w-14 h-14 rounded-xl overflow-hidden'>
//               <ImageBackground
//                 source={{
//                   uri: item.storeDetails.image, //"https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-10-20_at_11.07.13_AM.png?v=1697780292", // item.image,
//                   method: 'POST',
//                   headers: {
//                     Pragma: 'no-cache',
//                   },
//                 }}
//                 defaultSource={require('./../../assets/store.jpg')}
//                 className=' w-full h-full mr-2'
//                 alt="Logo"
//               >
//                 {/* <LinearGradient
//                 start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
//                 className='overflow-hidden h-full w-full'
//                 colors={['transparent', Colors.dark.colors.backGroundColor]}
//               ></LinearGradient> */}
//               </ImageBackground>
//             </View>
//             <View className=' flex-row ml-2'>
//               <View >
//                 <Text numberOfLines={1} ellipsizeMode='middle' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>
//                   {item.storeDetails.name}
//                 </Text>
//                 <View className='flex-row items-center' >
//                   <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm '>{item.storeDetails.type}</Text>
//                   <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
//                   <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm'>{item.storeDetails.menutype}</Text>
//                   <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
//                   <Text style={{ color: Colors.dark.colors.diffrentColorPerple }} className='text-sm'>{item.storeDetails.location}</Text>
//                 </View>
//               </View>
//             </View>
//             <View className=' absolute right-0 flex-row m-3 items-center'>
//               <Text className='font-black text-2xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>₹</Text>
//               <Text className='font-black text-2xl' style={{ color: Colors.dark.colors.mainTextColor }}> {item.totalPrice}</Text>
//             </View>
//           </View>
//           {item.items.map((cartItem, index) => (
//             <TouchableOpacity key={index} onPress={() => navigation.navigate('YettoUpdate')}>
//               <View className='px-3 flex-row justify-between items-center'>
//                 <View className='flex-row py-2'>
//                   <View className=' w-14 h-12 rounded-l-xl overflow-hidden'>
//                     <ImageBackground

//                       source={{
//                         uri: cartItem.image, // item.image,
//                         method: 'POST',
//                         headers: {
//                           Pragma: 'no-cache',
//                         },
//                       }}
//                       defaultSource={require('./../../assets/store.jpg')}
//                       className=' w-full h-full mr-2'
//                       alt="Logo"
//                     >
//                       {/* <LinearGradient
//                     start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
//                     className='overflow-hidden h-full w-full'
//                     colors={['transparent', 'black']}
//                   /> */}
//                     </ImageBackground>
//                   </View>
//                   <View className=' bg-black w-36 h-12 rounded-r-xl pl-3 pr-5 flex-row items-center' style={{ marginLeft: 4 }}>
//                     <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>₹</Text>
//                     <Text className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>  {cartItem.price}</Text>
//                   </View>
//                 </View>
//                 <View className='h-14 rounded-r-xl pl-3 pr-5 flex-row items-center' style={{ marginLeft: 4 }}>
//                   <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>X</Text>
//                   <Text className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>  {cartItem.quantity}</Text>
//                 </View>
//                 <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>{cartItem.price * cartItem.quantity}</Text>
//               </View>
//               {/* {console.log(cartItem)} */}
//             </TouchableOpacity>
//           ))}

//         </LinearGradient>
//       </View>
//     </TouchableOpacity>
//   );
// }

const ListCard_Self1 = ({ index, fontstyles, item, outletsNEW, changeOrderStatus, History, setHistory }) => {

  const navigation = useNavigation();
  const navToDetails = (item) => {
    navigation.navigate("Details", { Data: item });
  };
  const [showDetails, setShowDetails] = useState(null);

  const getRemainingTime = (startTime, timer) => {
    const targetTime = new Date(startTime).getTime() + timer * 60000; // startTime + timer in milliseconds
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;

    if (remainingTime <= 0) {
      return { minutes: 0, seconds: 0 };
    }

    const remainingMinutes = Math.floor(remainingTime / 60000);
    const remainingSeconds = Math.floor((remainingTime % 60000) / 1000);

    const remainingTime_inPersent = ((remainingMinutes * 60) / (timer * 60)) * 100

    return { minutes: remainingMinutes, seconds: remainingSeconds, persent: remainingTime_inPersent };
  };

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const { minutes, seconds } = getRemainingTime(item.startTime, item.timer);
      setTimeLeft({ minutes, seconds });
    }, 1000);

    // Cleanup interval on unmount or when countdown reaches zero
    return () => clearInterval(interval);
  }, [item.startTime, item.timer]);

  useFocusEffect(
    useCallback(() => {
      // Reset animation values or state if needed
      setShowDetails(null);
    }, [])
  );

  const { minutes, seconds, persent } = getRemainingTime(item.startTime, item.timer); // Calculate the remaining time
  const persentBackgroundColor = persent;

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).springify().damping(12)}>
      {/* <TouchableOpacity onPress={() => { navToDetails(outletsNEW.find(shop => shop.name === item.items.name)) }}> */}

      <View className='flex-row drop-shadow-2xl' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>


        <LinearGradient
          start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
          colors={['transparent', Colors.dark.colors.backGroundColor]}
          className=' -ml-1 flex-1 '
        >
          <TouchableOpacity onPress={() => { navToDetails(outletsNEW.find(shop => shop.name === item.items.name)) }}>

            <View className='px-3 py-2 flex-row items-center'>
              <View className=' w-2/5 h-32 rounded-xl overflow-hidden'>
                <ImageBackground
                  // source={require('./../Data/banner.jpg')}
                  source={{
                    uri: item.items.image,
                    method: 'POST',
                    headers: {
                      Pragma: 'no-cache',
                    },
                  }}
                  defaultSource={require('./../../assets/store.jpg')}
                  className=' w-full h-full mr-2'
                  alt="Logo"
                >
                  <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
                    className='overflow-hidden h-full w-full'
                    colors={['transparent', Colors.dark.colors.backGroundColor]}
                  />
                  <View className='absolute bottom-2 right-2'>
                    <View className='flex-row justify-center items-center'>
                      <View className='flex-row justify-center items-center'>
                        {item.items.type === "PureVeg" && <Ionicons name="leaf" size={16} color={Colors.dark.colors.diffrentColorGreen} />}
                        <Text className='ml-1' style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]}>{item.items.type}</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
              <View className=' ml-2'>
                <Text numberOfLines={1} ellipsizeMode='middle' style={[fontstyles.boldh2, { color: Colors.dark.colors.mainTextColor }]}>
                  {item.items.name}
                </Text>
                <View className='flex-row items-center' >
                  {/* <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm '>{item.storeDetails.type}</Text>
                <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} /> */}
                  {/* <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.textColor }]}>{item.storeDetails.menutype}</Text> */}
                  {/* <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} /> */}
                  <Text style={[fontstyles.h5, { color: Colors.dark.colors.diffrentColorPerple }]}>{item.items.location}</Text>
                </View>
                <View className='flex-row py-2'>
                  <View className=' px-4 rounded-md' style={{ backgroundColor: Colors.dark.colors.subbackGroundColor, paddingVertical: 8, borderWidth: 0, borderColor: Colors.dark.colors.diffrentColorOrange }}>
                    {/* <Text className='font-light text-base' style={{ color: Colors.dark.colors.textColor }}> */}
                    <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>
                      {item.items.orders.length} {item.items.orders.length > 1 ? 'items' : 'item'}
                    </Text>
                    {/* </Text> */}
                  </View>

                  <View className='flex-row ml-2 items-center'>
                    <Text style={[fontstyles.h5, { color: Colors.dark.colors.diffrentColorOrange }]}>₹</Text>
                    <Text style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}> {item.totalPrice}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity onPress={() => setShowDetails(!showDetails)} className='  -mb-2 -mr-4 flex-row absolute w-1/3 h-[45%] right-0 bottom-0 items-end justify-end pb-4 pr-6'>
                {/* <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]} className='underline mr-1'>view full order</Text> */}
                <Ionicons className=' bottom-0 right-0' name={showDetails ? 'caret-up' : 'caret-down'} size={16} color={Colors.dark.colors.diffrentColorOrange} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>


          {showDetails && item.items.orders.map((cartItem, index) => (
            <TouchableOpacity key={`${index}_${cartItem.id}`}
            // onPress={() => navigation.navigate('YettoUpdate')}
            >
              <View className='px-3 flex-row justify-between items-center'>
                <View className='flex-row py-2'>
                  <View className=' w-14 h-12 rounded-l-xl overflow-hidden'>
                    <ImageBackground
                      source={{
                        uri: cartItem.image, // item.image,
                        method: 'POST',
                        headers: {
                          Pragma: 'no-cache',
                        },
                      }}
                      defaultSource={require('./../../assets/menu.jpg')}
                      className=' w-full h-full mr-2'
                      alt="Logo"
                    >
                      {/* <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
                    className='overflow-hidden h-full w-full'
                    colors={['transparent', 'black']}
                  /> */}
                    </ImageBackground>
                  </View>
                  <View className=' w-36 h-12 rounded-r-xl pl-3 pr-5 flex-row items-center' style={{ backgroundColor: Colors.dark.colors.subbackGroundColor, marginLeft: 4 }}>
                    <Text style={[fontstyles.h4, { color: Colors.dark.colors.diffrentColorOrange }]}>₹</Text>
                    <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.mainTextColor }]}>  {cartItem.price}</Text>
                  </View>
                </View>
                <View className='h-14 rounded-r-xl pl-3 pr-5 flex-row items-center' style={{ marginLeft: 4 }}>
                  <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.diffrentColorOrange }]}>X</Text>
                  <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.mainTextColor }]}>  {cartItem.quantity}</Text>
                </View>
                <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.diffrentColorOrange }]}>{cartItem.price * cartItem.quantity}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* <View className='my-6 px-4' key={index}>
              <View className='flex-row justify-between -mb-2'>
                <View>
                  <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>Order Status</Text>
                  <Text style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>{item.status == 'Scheduled' ? 'Waiting for Approval.' : item.status}</Text>
                </View>
                <View className='items-end'>
                  <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>Total Amount</Text>
                  <Text style={[fontstyles.number, { fontSize: 16, color: Colors.dark.colors.diffrentColorOrange }]}>₹ {item.totalPrice.toFixed(2)}</Text>
                </View>
              </View>
            </View> */}
          <View className='p-3'>
            {item.status == 'Delivered' || item.status == 'Missing' ?
              <View className=' h-12 flex-row justify-between'>
                <TouchableOpacity
                  onPress={() => {
                    const { name, items: { __v, closingTime, details, featured, leaveDay, offDays, openingTime, rating, ratingcount, ...restOfItems }, ...itemWithoutName } = item;
                    setHistory(prevHistory => [...prevHistory, { itemWithoutName, items: restOfItems }]);
                    console.log('Histry Updated')
                    changeOrderStatus(item._id, "Received");
                  }}
                  className=' items-center rounded-xl justify-center px-4'
                  style={{ backgroundColor: Colors.dark.colors.diffrentColorGreen, }}
                >
                  <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>Received</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    changeOrderStatus(item._id, "Missing");
                    navigation.navigate('ComplaintScreen', {
                      outletName: item.items.name,
                      orderNumber: item.id,
                      order_Id: item._id,
                    });
                  }}
                  className=' items-center rounded-xl justify-center px-4'
                  style={{ backgroundColor: Colors.dark.colors.diffrentColorRed, }}
                >
                  <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}> Missing </Text>
                </TouchableOpacity>
              </View>
              :
              <View className=' h-12 rounded-xl flex items-center justify-center overflow-hidden'
                style={[
                  {
                    paddingVertical: 10,
                    borderRadius: 5,
                    backgroundColor: Colors.dark.colors.diffrentColorPerpleBG,
                  },
                ]}
              >
                <Text style={[fontstyles.number]} className="text-black text-center uppercase mr-2">
                  {item.status == 'Scheduled' ? 'Waiting for approval' : item.status == 'Accepted' ? 'Estimated Wait Time' : item.status}
                </Text>
                {item.status == 'Accepted' &&
                  <Text style={[fontstyles.number]} className="text-black text-center">
                    ({minutes}m {seconds}s)
                  </Text>
                }
                <View
                  style={{
                    backgroundColor: Colors.dark.colors.diffrentColorPerple,
                    width: `${persentBackgroundColor}%`,
                  }}
                  className=" -z-10 absolute top-0 left-0 h-20"
                />
              </View>
            }
            {/* getRemainingTime */}
          </View>
          {/* {console.log('item', item.items.name)} */}
        </LinearGradient>

        {/* <TouchableOpacity className=' items-center justify-center' onPress={onShowDetails}>
          <Ionicons name="chevron-forward-outline" size={28} color={Colors.dark.colors.textColor} />
        </TouchableOpacity> */}

      </View>
      {/* </TouchableOpacity> */}
    </Animated.View>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [noOrders, setNoOrders] = useState(true);

  const navigation = useNavigation();
  const { userData, dateGroup, outletsNEW, History, setHistory } = useContext(GlobalStateContext);
  const [showDetails, setShowDetails] = useState(null);

  const fetchOrders = async () => {
    const contactinfo = { contactinfo: userData.contactinfo };

    try {
      const response = await fetch(`${API_BASE_URL}:${ORDERSBUYER_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactinfo),
      });

      const data = await response.json();
      if (data.status === 'ok') {
        setOrders(data.data);
        setNoOrders(data.data.length === 0); // If no orders, set noOrders to true
      } else if (data.status === "alert") {
        setNoOrders(true); // No orders available, set noOrders to true
      } else {
        console.error('Error fetching orders:', data);
        setNoOrders(true); // In case of error, set noOrders to true
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setNoOrders(true); // In case of error, set noOrders to true
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [])

  // useEffect(() => {
  //   // Debugging AsyncStorage retrieval
  //   const fetchHistory = async () => {
  //     try {
  //       const storedHistory = await AsyncStorage.getItem('@history');
  //       console.log('Fetched History:', storedHistory); // Debug: Check the raw data from AsyncStorage
  //       if (storedHistory) {
  //         const parsedHistory = JSON.parse(storedHistory);
  //         console.log('Parsed History:', parsedHistory); // Debug: Check parsed data
  //         setHistory(parsedHistory); // Update context state
  //       }
  //     } catch (error) {
  //       console.error('Failed to load history:', error);
  //     }
  //   };

  //   fetchHistory(); // Fetch the history when component mounts
  // }, []); //setHistory

  const changeOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}:${CHANGEORDERSTATUS_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newStatus }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        fetchOrders(); // Refresh the orders after declining
      } else {
        console.error('Error declining order:', data);
      }
    } catch (error) {
      console.error('Error declining order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(() => {
      fetchOrders(); // Refresh orders every 10 seconds
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // console.log('dateordersGroup', orders)
  const fontstyles = TextStyles();

  return (
    <View className='h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
      <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {(noOrders || orders.length == 0) ?
            <View className='flex-1 justify-center items-center p-2' style={{ height: Dimensions.get('window').height * 0.8 }}>
              <Text className='font-black text-xl text-center py-3' style={{ color: Colors.dark.colors.mainTextColor }}>
                No Orders Placed Yet!
              </Text>
              <Text className='font-normal text-base text-center' style={{ color: Colors.dark.colors.textColor }}>
                It looks like you haven’t placed any orders so far. Want to revisit your previous orders? You can always explore your past purchases and make some new delicious memories!
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('History')}
                className=' mt-4 items-center rounded-xl justify-center p-4'
                style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }}
              >
                <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>
                  View Order History
                </Text>
              </TouchableOpacity>
            </View>
            :
            <View className='mb-6 px-4'>
              {orders.map((item, index) => (
                <ListCard_Self1
                  History={History}
                  setHistory={setHistory}
                  changeOrderStatus={changeOrderStatus}
                  key={item.id} // or key={`${item.id}_${index}`} if item.id is not unique
                  index={index}
                  fontstyles={fontstyles}
                  item={item}
                  outletsNEW={outletsNEW}
                />
              ))}
            </View>
          }





        </View>
        {/* {dateGroup.map((item, index) => (
              <View key={index}>
                <ListCard_Self2 item={item} onShowDetails={() => handleShowDetails(index)} showDetails={showDetails === index} />
                {showDetails === index && <ListCard_Self3 item={item} />}
              </View>
            ))} */}
      </ScrollView >
    </View >
  )
}

const styles = StyleSheet.create({
  foodItemCollectionContainer: {
    marginTop: Dimensions.get('window').height * 0.02,
    gap: Dimensions.get('window').width * 0.04,
    borderRadius: 18,
  },
  shadowProp: {
    backgroundColor: Colors.dark.colors.shadowcolor,
    elevation: 10,
  },
})