import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors from '../Components/Colors';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import TextStyles from '../Style/TextStyles';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ListCard_Self3 = ({ item, fontstyles, index, outletsNEW }) => {
    const navigation = useNavigation();
    const [showDetails, setShowDetails] = useState(null);

    useFocusEffect(
        useCallback(() => {
            // Reset animation values or state if needed
            setShowDetails(null);
        }, [])
    );

    const navToDetails = (item) => {
        navigation.navigate("Details", { Data: item });
      };

    return (
        <Animated.View entering={FadeInDown.delay(index * 100).springify().damping(12)}>
            <TouchableOpacity onPress={() => { navToDetails(outletsNEW.find(shop => shop.name === item.items.name)) }} className='flex-row drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
                <LinearGradient
                    start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
                    colors={['transparent', Colors.dark.colors.backGroundColor]}
                    className=' -ml-1 flex-1'
                >
                    <View className='p-3 flex-row'>
                        <View className=' w-14 h-14 rounded-xl overflow-hidden'>
                            <ImageBackground
                                source={{
                                    uri: item.items.image, //"https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-10-20_at_11.07.13_AM.png?v=1697780292", // item.image,
                                    method: 'POST',
                                    headers: {
                                        Pragma: 'no-cache',
                                    },
                                }}
                                defaultSource={require('./../../assets/store.jpg')}
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
                                <Text numberOfLines={1} ellipsizeMode='middle' style={[fontstyles.boldh2, { color: Colors.dark.colors.mainTextColor }]} >
                                    {item.items.name}
                                </Text>
                                <View className='flex-row items-center' >
                                    <Text style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]} className='text-sm pt-1'>{item.items.type}</Text>
                                    {/* <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                                    <Text style={{ color: Colors.dark.colors.textColor }} className='text-sm'>{item.items.menutype}</Text> */}
                                    <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                                    <Text style={[fontstyles.h5, { color: Colors.dark.colors.diffrentColorPerple }]} className='text-sm pt-1'>{item.items.location}</Text>
                                </View>
                            </View>
                        </View>
                        <View className=' absolute m-3 right-0'>
                            <View className='flex-row items-center justify-end'>
                                <Text className='text-2xl' style={[fontstyles.h5, { color: Colors.dark.colors.diffrentColorOrange }]}>₹</Text>
                                <Text className='text-2xl' style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}> {item.itemWithoutName.totalPrice}</Text>
                            </View>
                            {/* backgroundColor: Colors.dark.colors.subbackGroundColor, */}
                            <TouchableOpacity onPress={() => setShowDetails(!showDetails)} className='flex-row rounded-md ' style={{ paddingVertical: 8, borderWidth: 0, borderColor: Colors.dark.colors.diffrentColorOrange }}>
                                <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>
                                    {item.items.orders.length} {item.items.orders.length > 1 ? 'items' : 'item'}
                                </Text>
                                <View className=' items-end justify-end ml-1 '>
                                    {/* <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]} className='underline mr-1'>view full order</Text> */}
                                    <Ionicons className=' bottom-0 right-0' name={showDetails ? 'caret-up' : 'caret-down'} size={16} color={Colors.dark.colors.diffrentColorOrange} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
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

                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
}

export default function History() {

    const { History, setHistory, outletsNEW } = useContext(GlobalStateContext);
    const fontstyles = TextStyles();
    var dateG;

    return (
        <View className='h-full w-full mb-6 px-4' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
            <StatusBar backgroundColor={Colors.dark.colors.subbackGroundColor} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {History.length == 0 ? (
                    <View className="flex-1 justify-center items-center p-2" style={{ height: Dimensions.get('window').height * 1 }}>
                        <Ionicons name={'thumbs-down'} size={42} color={Colors.dark.colors.mainTextColor} />
                        <Text className="font-black text-xl text-center py-3" style={{ color: Colors.dark.colors.mainTextColor }}>
                            No Orders Yet? Seriously?
                        </Text>
                        <Text className="font-normal text-base text-center" style={{ color: Colors.dark.colors.textColor }}>
                            You haven't placed any orders yet. Don't miss out on our amazing items! Go ahead and fill up this space with delicious memories!
                        </Text>
                    </View>
                ) : (
                    History.map((item, index) => {
                        if (dateG != item.itemWithoutName.date) {
                            dateG = item.itemWithoutName.date
                            return (
                                <View key={index}>
                                    <View className="mt-6">
                                        <View>
                                            <Text className=' text-center' style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>
                                                Date
                                            </Text>
                                            <Text className=' text-center' style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>
                                                {item.itemWithoutName.date}
                                            </Text>
                                        </View>
                                        {/* <View className="flex-row justify-between -mb-2">
                                            <View>
                                                <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>
                                                    Date
                                                </Text>
                                                <Text style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>
                                                    {new Date(item.itemWithoutName.date.replace(/(\d)(st|nd|rd|th)/, '$1')).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </Text>
                                            </View>
                                            <View className="items-end">
                                                <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>
                                                    Total Amount
                                                </Text>
                                                <Text style={[fontstyles.number, { fontSize: 16, color: Colors.dark.colors.diffrentColorOrange }]}>
                                                    ₹ {item.itemWithoutName.totalPrice}
                                                </Text>
                                            </View>
                                        </View> */}
                                    </View>
                                    <ListCard_Self3 item={item} fontstyles={fontstyles} index={index} outletsNEW={outletsNEW}/> {/* Render the ListCard_Self3 */}
                                </View>
                            );
                        }

                        // If the date matches, render ListCard_Self3 without the "Order Status" block
                        return <ListCard_Self3 key={index} item={item} fontstyles={fontstyles} index={index} outletsNEW={outletsNEW}/>;
                    })
                )}

            </ScrollView>
        </View>
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