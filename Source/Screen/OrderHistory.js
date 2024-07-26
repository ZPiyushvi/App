import { View, Text, TouchableOpacity, StatusBar, ImageBackground, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../Components/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";
import Icons from '../Components/Icons'
import { GlobalStateContext } from '../Context/GlobalStateContext'
import TextStyles from '../Style/TextStyles'
const { StarIcon, CarIcon } = Icons();


const ListCard_Self2 = ({ item, onShowDetails, showDetails }) => {
  const navigation = useNavigation();

  const navToDetails = (item) => {
    navigation.navigate("Details", { Data: item });
  };
  return (
    <TouchableOpacity >
      <View className='flex-row drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
        <LinearGradient
          start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
          colors={['transparent', Colors.dark.colors.backGroundColor]}
          className=' -ml-1 flex-1 flex-row px-3 py-2 items-center'
        >
          <View className=' w-2/5 h-32 rounded-xl overflow-hidden'>
            <ImageBackground
              // source={require('./../Data/banner.jpg')}
              source={{
                uri: item.storeDetails.image,
                method: 'POST',
                headers: {
                  Pragma: 'no-cache',
                },
              }}
              defaultSource={require('./../../assets/favicon.png')}
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
                  {
                    item.storeDetails.type === "PureVeg" &&
                    <>
                      <Text style={[{ color: '#00e676' }]} className='text-base font-semibold mr-1'>Pure {item.type}</Text>
                      <Ionicons name="leaf" size={16} color={'#00e676'} />
                    </>
                  }
                </View>
              </View>
            </ImageBackground>
          </View>
          <View className=' ml-2'>
            <Text numberOfLines={1} ellipsizeMode='middle' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>
              {item.storeDetails.name}
            </Text>
            <View className='flex-row items-center' >
              <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm '>{item.storeDetails.type}</Text>
              {/* <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
              <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm'>{item.storeDetails.menutype}</Text> */}
              <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
              <Text style={{ color: Colors.dark.colors.diffrentColorPerple }} className='text-sm'>{item.storeDetails.location}</Text>
            </View>
            <View className='flex-row py-2'>
              <View className=' px-4 rounded-md bg-black' style={{ paddingVertical: 8, borderWidth: 0, borderColor: Colors.dark.colors.diffrentColorOrange }}>
                <Text className='font-light text-base' style={{ color: Colors.dark.colors.textColor }}>
                  <Text className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>
                    {item.items.length} {item.items.length > 1 ? 'items' : 'item'}
                  </Text>
                </Text>
              </View>

              <View className='flex-row ml-2 items-center'>
                <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>₹</Text>
                <Text className='font-light text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> {item.totalPrice}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View className=' p-3' />
        <TouchableOpacity className=' absolute right-2 bottom-2' onPress={onShowDetails}>
          <Ionicons name={showDetails ? "chevron-up-outline" : "chevron-down-outline"} size={28} color={Colors.dark.colors.textColor} />
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
}

const ListCard_Self3 = ({ item }) => {
  const navigation = useNavigation();
  const navToDetails = (item) => {
    navigation.navigate("Details", { Data: item });
  };
  return (
    <TouchableOpacity activeOpacity={1} >
      <View className='flex-row drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
        <LinearGradient
          start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
          colors={['transparent', Colors.dark.colors.backGroundColor]}
          className=' -ml-1 flex-1'
        >
          <View className='p-3 flex-row'>
            <View className=' w-14 h-14 rounded-xl overflow-hidden'>
              <ImageBackground
                source={{
                  uri: item.storeDetails.image, //"https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-10-20_at_11.07.13_AM.png?v=1697780292", // item.image,
                  method: 'POST',
                  headers: {
                    Pragma: 'no-cache',
                  },
                }}
                defaultSource={require('./../../assets/favicon.png')}
                className=' w-full h-full mr-2'
                alt="Logo"
              >
                {/* <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
                className='overflow-hidden h-full w-full'
                colors={['transparent', Colors.dark.colors.backGroundColor]}
              ></LinearGradient> */}
              </ImageBackground>
            </View>
            <View className=' flex-row ml-2'>
              <View >
                <Text numberOfLines={1} ellipsizeMode='middle' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>
                  {item.storeDetails.name}
                </Text>
                <View className='flex-row items-center' >
                  <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm '>{item.storeDetails.type}</Text>
                  <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                  <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm'>{item.storeDetails.menutype}</Text>
                  <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                  <Text style={{ color: Colors.dark.colors.diffrentColorPerple }} className='text-sm'>{item.storeDetails.location}</Text>
                </View>
              </View>
            </View>
            <View className=' absolute right-0 flex-row m-3 items-center'>
              <Text className='font-black text-2xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>₹</Text>
              <Text className='font-black text-2xl' style={{ color: Colors.dark.colors.mainTextColor }}> {item.totalPrice}</Text>
            </View>
          </View>
          {item.items.map((cartItem, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('YettoUpdate')}>
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
                      defaultSource={require('./../../assets/favicon.png')}
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
                  <View className=' bg-black w-36 h-12 rounded-r-xl pl-3 pr-5 flex-row items-center' style={{ marginLeft: 4 }}>
                    <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>₹</Text>
                    <Text className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>  {cartItem.price}</Text>
                  </View>
                </View>
                <View className='h-14 rounded-r-xl pl-3 pr-5 flex-row items-center' style={{ marginLeft: 4 }}>
                  <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>X</Text>
                  <Text className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>  {cartItem.quantity}</Text>
                </View>
                <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>{cartItem.price * cartItem.quantity}</Text>
              </View>
              {/* {console.log(cartItem)} */}
            </TouchableOpacity>
          ))}

        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const ListCard_Self1 = ({ fontstyles, item, outletsNEW }) => {
  
  const navigation = useNavigation();
  const navToDetails = (item) => {
    navigation.navigate("Details", { Data: item });
  };
  const [showDetails, setShowDetails] = useState(null);

  return (
    <TouchableOpacity onPress={() => { navToDetails(outletsNEW.find(shop => shop.name === item.storeDetails.name)) }}>
      <View className='flex-row drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
        <LinearGradient
          start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
          colors={['transparent', Colors.dark.colors.backGroundColor]}
          className=' -ml-1 flex-1 '
        >
          <View className='px-3 py-2 flex-row items-center'>
            <View className=' w-2/5 h-32 rounded-xl overflow-hidden'>
              <ImageBackground
                // source={require('./../Data/banner.jpg')}
                source={{
                  uri: item.storeDetails.image,
                  method: 'POST',
                  headers: {
                    Pragma: 'no-cache',
                  },
                }}
                defaultSource={require('./../../assets/favicon.png')}
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
                      {item.storeDetails.type === "PureVeg" && <Ionicons name="leaf" size={16} color={Colors.dark.colors.diffrentColorGreen} />}
                      <Text className='ml-1' style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]}>{item.storeDetails.type}</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View className=' ml-2'>
              <Text numberOfLines={1} ellipsizeMode='middle' style={[fontstyles.boldh2, { color: Colors.dark.colors.mainTextColor }]}>
                {item.storeDetails.name}
              </Text>
              <View className='flex-row items-center' >
                {/* <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm '>{item.storeDetails.type}</Text>
                <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} /> */}
                {/* <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.textColor }]}>{item.storeDetails.menutype}</Text> */}
                {/* <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} /> */}
                <Text style={[fontstyles.h5, { color: Colors.dark.colors.diffrentColorPerple }]}>{item.storeDetails.location}</Text>
              </View>
              <View className='flex-row py-2'>
                <View className=' px-4 rounded-md' style={{ backgroundColor:Colors.dark.colors.subbackGroundColor, paddingVertical: 8, borderWidth: 0, borderColor: Colors.dark.colors.diffrentColorOrange }}>
                  {/* <Text className='font-light text-base' style={{ color: Colors.dark.colors.textColor }}> */}
                  <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>
                    {item.items.length} {item.items.length > 1 ? 'items' : 'item'}
                  </Text>
                  {/* </Text> */}
                </View>

                <View className='flex-row ml-2 items-center'>
                  <Text style={[fontstyles.h5, { color: Colors.dark.colors.diffrentColorOrange }]}>₹</Text>
                  <Text style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}> {item.totalPrice}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => setShowDetails(!showDetails)} className='pt-10 pl-80 flex-row items-center absolute right-4 bottom-2'>
              {/* <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]} className='underline mr-1'>view full order</Text> */}
              <Ionicons name={showDetails ? 'caret-up' : 'caret-down'} size={16} color={Colors.dark.colors.diffrentColorOrange} />
            </TouchableOpacity>
          </View>

          {showDetails && item.items.map((cartItem, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('YettoUpdate')}>
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
                  <View className=' w-36 h-12 rounded-r-xl pl-3 pr-5 flex-row items-center' style={{ backgroundColor:Colors.dark.colors.subbackGroundColor, marginLeft: 4 }}>
                    <Text style={[fontstyles.h4, { color: Colors.dark.colors.diffrentColorOrange }]}>₹</Text>
                    <Text style={[ fontstyles.boldh2, { color: Colors.dark.colors.mainTextColor }]}>  {cartItem.price}</Text>
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
        </LinearGradient>

        {/* <TouchableOpacity className=' items-center justify-center' onPress={onShowDetails}>
          <Ionicons name="chevron-forward-outline" size={28} color={Colors.dark.colors.textColor} />
        </TouchableOpacity> */}

      </View>
    </TouchableOpacity>
  );
}

export default function OrderHistory() {
  const navigation = useNavigation();
  const { dateGroup, outletsNEW } = useContext(GlobalStateContext);
  const [showDetails, setShowDetails] = useState(null);
  const handleShowDetails = (index) => {
    setShowDetails(showDetails === index ? null : index);
  };

  // console.log(dateGroup)
  const fontstyles = TextStyles();
  return (
    <View className='h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
      <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {dateGroup.length == 0 &&
            <View className=' flex-1 justify-center items-center p-2' style={{ height: Dimensions.get('window').height * 0.8 }}>
              <Ionicons name={'thumbs-down'} size={42} color={Colors.dark.colors.mainTextColor} />
              <Text className='font-black text-xl text-center py-3' style={{ color: Colors.dark.colors.mainTextColor }}>No Orders Yet? Seriously?</Text>
              <Text className='font-normal text-base text-center' style={{ color: Colors.dark.colors.textColor }}>
                You haven't placed any orders yet. Don't miss out on our amazing items! Go ahead and fill up this space with delicious memories!
              </Text>
            </View>
          }
          {dateGroup.map((group, index) => {
            return (
              <View className='my-6 px-4' key={index}>
                <View className='flex-row justify-between -mb-2'>
                  <View>
                    <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>Order Date</Text>
                    <Text style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>{group.date}</Text>
                  </View>
                  <View className='items-end'>
                    <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>Total Amount</Text>
                    <Text style={[fontstyles.number, { fontSize: 16, color: Colors.dark.colors.diffrentColorOrange }]}>₹ {group.total.toFixed(2)}</Text>
                  </View>
                </View>

                <View>
                  {group.orders.map((order, index) => (
                    <View key={index}>
                      <ListCard_Self1 fontstyles={fontstyles} item={order} outletsNEW={outletsNEW}/>
                    </View>
                  ))}
                </View>
              </View>
            )
          }
          )}
        </View>
        {/* {History.map((item, index) => (
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