import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, ScrollView, Alert, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import FoodIcon from '../Components/FoodIcon';
import Colors from '../Components/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useNavigation } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { removeStoreFromCart } from '../Components/removeStoreFromCart';
import useIncrementHandler from '../Components/handleIncrement';
import { API_BASE_URL, ORDERS_ENDPOINT } from '../Constants/Constants';
import TextStyles from '../Style/TextStyles';
import { StatusBar } from 'expo-status-bar';

const Cart = ({ route }) => {

  const { handleIncrement } = useIncrementHandler();
  const { handleDecrement } = useIncrementHandler();
  // const { storeName, items, totalPrice, storeDetails } = route.params;
  // const { item } = route.params;

  async function createOrder(orderData) {

    try {
      const response = await fetch(`${API_BASE_URL}:${ORDERS_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Order created successfully:', result.data);
        return result.data;
      } else {
        console.error('Error creating order:', result.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }

  const { userData, outletsNEW, cartItemsNEW, setCartItems, setCartItemsNEW, campusShops, setcampusShops, History, setHistory } = useContext(GlobalStateContext);

  // cartItemsNEW.find((cart) => console.log(cart.name));
  const item = cartItemsNEW?.find((cart) => cart.name === route.params.item.name);

  const updateCartItemsStatus = () => {
    const updatedCartItems = cartItemsNEW.map(cartItem => {
      const outlet = outletsNEW.find(outlet => outlet.id === cartItem.id);
      // console.log(outlet, 'outlet')
      if (outlet) {
        const updatedOrders = cartItem.orders.map(order => {
          const menu = outlet.menu.flatMap(menu => menu.items);
          const menuItem = menu.find(item => item.id === order.id);
          if (menuItem) {
            return {
              ...order,
              status: menuItem.status
            };
          }
          return order;
        });
        return {
          ...cartItem,
          orders: updatedOrders
        };
      }
      return cartItem;
    });
    setCartItemsNEW(updatedCartItems);
  };

  useEffect(() => {
    updateCartItemsStatus();
  }, []);

  useEffect(() => {
    if (!item) {
      navigation.goBack();
    }
  }, [item]);


  // const totalPrice = item.orders ? item.orders.reduce((acc, order) => acc + (parseInt(order.price) * order.quantity), 0) : 0;
  const totalPrice = item?.orders
    ? item.orders.reduce((acc, order) => acc + (parseInt(order.price, 10) * order.quantity), 0)
    : 0;
  const totalQuantity = item?.orders.reduce((acc, order) => acc + order.quantity, 0);

  const today = new Date();
  // const yesterday = new Date();
  // yesterday.setDate(today.getDate() - 6);

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
              <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.colors.diffrentColorGreen }]} onPress={() => { handleIncrement(item.id, item.id, item, [...item.orders, item.id]) }}>
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

  const renderItem2 = ({ item, index, hotelId }) => (
    <>
      <View key={item.id} className='py-3 pl-3 overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
        {/* {console.log('[...item.orders, item.id]', { orders: item.orders, id: hotelId })} */}
        <View className='flex-row w-full' >
          <View className=' absolute right-3'>
            {item.status ?
              <Text className='uppercase' style={[fontstyles.number, { color: Colors.dark.colors.diffrentColorGreen }]}>InStock</Text>
              : <Text className='uppercase' style={[fontstyles.number, { color: Colors.dark.colors.diffrentColorRed }]}>SoldOut</Text>
            }
          </View>

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
              defaultSource={require('./../../assets/menu.jpg')}
              resizeMode="cover"
              alt="Logo"
              className='w-full h-20 border-2 rounded-lg overflow-hidden border-slate-950'
              style={{ borderWidth: 2, borderColor: Colors.dark.colors.secComponentColor }}
            />
          </View>
          <View className=' w-9/12 px-3'>
            <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}>{item.item}</Text>
            <Text style={[fontstyles.h6, { color: Colors.dark.colors.textColor }]}>Quantity: {item.quantity} * ₹{item.price}</Text>
            <View className=' flex-row justify-between w-full '>
              <View className='flex-1 justify-end'>
                <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>
                  ₹{item.price * item.quantity}
                </Text>
              </View>
              <View
                style={[styles.button, { backgroundColor: Colors.dark.colors.componentColor, borderColor: Colors.dark.colors.textColor, borderWidth: 1 }]}
                className='h-8 w-20  flex-row overflow-hidden mb-1'
              >
                {item.quantity > 0 ? (
                  <>
                    {/* {console.log('xxxxx', item)} */}
                    <TouchableOpacity onPress={() => { handleDecrement(item.id, item.id, item, { id: hotelId }) }} className='z-10 left-0 absolute w-6/12 items-center'>
                      <Ionicons color={Colors.dark.colors.textColor} name={'remove'} size={16} />
                    </TouchableOpacity>
                    <Text className='text-base font-black text-center' style={{ color: item.status ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.diffrentColorRed }}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => { handleIncrement(item.id, item.id, item, { id: hotelId }) }} className='z-10 right-0 absolute w-6/12 items-center'>
                      <Ionicons color={Colors.dark.colors.textColor} name={'add'} size={16} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.colors.diffrentColorGreen }]} >
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
    </>
  );


  const filteredItems = item?.orders.map(({ price, quantity, image, category }) => ({
    price,
    quantity,
    image,
    category
  }));

  const [massage, setMassage] = useState('')

  const handleProceedPayment = (item) => {

    // console.log('item', item)
    const removeItemsWithStatusFalse = () => {
      item.orders = item.orders.filter(order => order.status == true);
    };
    const outOfStockItems = item.orders.some(order => order.status === false);

    if (outOfStockItems) {
      Alert.alert(
        "Out of Stock Items",
        "Your cart contains some items that are currently out of stock. Would you like to proceed with the available items or review your cart?",
        [{
          text: "Review Cart",
        }, {
          text: "Yes, Proceed",
          onPress: () => {
            removeItemsWithStatusFalse();
            console.log("Proceeding with item:", item);

            const { orders, ...storeDetails } = item;  // Destructure to separate orders from the rest of the item properties
            const { name, username } = userData;

            if (orders.length !== 0) {
              
              createOrder({
                id: Date.now().toString(),
                items: item,
                // name: userData,    
                massage: massage,
                totalPrice: item?.orders
                  ? item.orders.reduce((acc, order) => acc + (parseInt(order.price, 10) * order.quantity), 0)
                  : 0,
                // Noformatdate: today,
                date: getFormattedDate(today),
                status: 'Scheduled',
                name: userData,
              })
              // createOrder({
              //   id: Date.now().toString(),
              //   items: orders,
              //   storeDetails: storeDetails,
              //   totalPrice: item?.orders
              //     ? item.orders.reduce((acc, order) => acc + (parseInt(order.price, 10) * order.quantity), 0)
              //     : 0,
              //   Noformatdate: today,
              //   date: getFormattedDate(today),
              //   userData: { name, username }
              // })
              setHistory(prevHistory => [
                {
                  items: orders,
                  storeDetails: storeDetails,
                  totalPrice: item?.orders
                    ? item.orders.reduce((acc, order) => acc + (parseInt(order.price, 10) * order.quantity), 0)
                    : 0,
                  date: getFormattedDate(today),
                  massage: massage,
                  status: 'Scheduled',
                },
                ...prevHistory
              ]);
            }
            removeStoreFromCart(item.name, setCartItemsNEW);
            navigation.navigate("Orders");
          }
        }]
      );
    } else {
      console.log("Proceeding with item:", item);
      const { orders, ...storeDetails } = item;  // Destructure to separate orders from the rest of the item properties
     
      // const { name, username } = userData;

      createOrder({
        id: Date.now().toString(),
        items: item,
        // name: userData,    
        massage: massage,
        totalPrice: item?.orders
          ? item.orders.reduce((acc, order) => acc + (parseInt(order.price, 10) * order.quantity), 0)
          : 0,
        // Noformatdate: today,
        date: getFormattedDate(today),
        status: 'Scheduled',
        name: userData,
      })
      // createOrder({
      //   id: Date.now().toString(),
      //   items: orders,
      //   storeDetails: storeDetails,
      //   totalPrice: item?.orders
      //     ? item.orders.reduce((acc, order) => acc + (parseInt(order.price, 10) * order.quantity), 0)
      //     : 0,
      //   Noformatdate: today,
      //   date: getFormattedDate(today),
      //   userData: userData //{name, username}
      // })

      setHistory(prevHistory => [
        {
          items: orders,
          storeDetails: storeDetails,
          totalPrice: totalPrice,
          Noformatdate: today,
          date: getFormattedDate(today)
        },
        ...prevHistory
      ]);
      removeStoreFromCart(item.name, setCartItemsNEW);
      navigation.navigate("Orders");
    }
  };


  const fontstyles = TextStyles();

  return (
    // View style={{backgroundColor: Colors.dark.colors.backGroundColor}}
    <View className='h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>

      <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />

      <ScrollView>
        <View className=' p-5 h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>

          <View className=' mb-5 rounded-xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
            <View className='p-3 flex-row' >
              <Ionicons name="bag-check-outline" size={24} color={Colors.dark.colors.mainTextColor} />
              <View className=' ml-3 flex-row'>
                <Text style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>You have </Text>
                <Text style={[fontstyles.number, { marginTop: 3, color: Colors.dark.colors.mainTextColor }]}>
                  {totalQuantity} {totalQuantity > 1 ? 'items' : 'item'}
                </Text>
                <Text style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}> in your list</Text>
              </View>
            </View>
            <View className='flex-row p-3' >
              <Ionicons name="document-text-outline" size={24} color={Colors.dark.colors.mainTextColor} />
              <View className=' ml-3'>
                <View className='flex-row'>
                  <Text style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Note for the outlet </Text>
                  {/* <Text className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>₹{totalPrice}</Text> */}
                </View>
                <TextInput
                  className='font-medium text-sm'
                  style={{ color: Colors.dark.colors.textColor }}
                  value={massage}
                  multiline={true}
                  onChangeText={(text) => setMassage(text)}
                  placeholder="Edit category title"
                  placeholderTextColor={Colors.dark.colors.textColor}
                />
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
            {item?.orders.map((items, index) => (
              renderItem2({ hotelId: item.id, item: items, index: index, })
              // console.log(items[index])
            ))}
          </View>

          <View className=' mt-5 rounded-xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
            <View className='p-3 flex-row' >
              <Ionicons name="timer-outline" size={24} color={Colors.dark.colors.mainTextColor} />
              <View className=' ml-3 flex-row'>
                <Text style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Average Time is </Text>
                <Text style={[fontstyles.number, { marginTop: 3, color: Colors.dark.colors.mainTextColor }]}>20 mins</Text>
              </View>
            </View>

            <View className='p-3'>
              <View className='flex-row' >
                <Ionicons name="receipt-outline" size={24} color={Colors.dark.colors.mainTextColor} />
                <View className=' ml-3'>
                  <View className='flex-row'>
                    <Text style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Total Bill </Text>
                    <Text style={[fontstyles.number, { marginTop: 2, color: Colors.dark.colors.mainTextColor }]}>₹{totalPrice}</Text>
                  </View>
                  <Text style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]}>Incl. taxes, charges & donation</Text>
                </View>
              </View>
              <View className='absolute top-3 right-3 items-end'>
                <Ionicons name="chevron-forward-outline" size={24} color={Colors.dark.colors.mainTextColor} />
              </View>
            </View>
          </View>

          <View className='mt-4 mb-24'>
            <Text className='spacing tracking-[4]' style={[fontstyles.entryUpper, { color: Colors.dark.colors.textColor }]}>CANCELLATION POLICY</Text>
            <Text className='mt-1' style={[fontstyles.number, { color: Colors.dark.colors.textColor }]}>
              Help us reduce food waste by avoiding cancellations after placing your order. A 100% cancellation fee will be applied.
            </Text>
          </View>

        </View>


      </ScrollView>

      <View className=' p-5 rounded-t-2xl flex-row items-center w-full justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
        <View>
          <View className=' flex-row'>
            <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.diffrentColorOrange }]}>₹{totalPrice.toFixed(2)}</Text>
          </View>
          <Text className='font-medium text-base' style={[fontstyles.number, { color: Colors.dark.colors.textColor }]}>TOTAL</Text>
        </View>
        {/* {console.log(today, getFormattedDate(today))} */}
        <TouchableOpacity
          onPress={() => handleProceedPayment(item)}
          className=' p-3 flex-row justify-center items-center rounded-lg' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange, width: Dimensions.get('window').width * 0.53 }}>
          <Text style={[ fontstyles.number, { fontSize: 18,  color: Colors.dark.colors.mainTextColor }]}>Proceed to Pay</Text>
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
