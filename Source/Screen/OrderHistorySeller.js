import { View, Text, Dimensions, Alert, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Colors from '../Components/Colors';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL, ORDERSSELLER_ENDPOINT } from '../Constants/Constants';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { LinearGradient } from 'expo-linear-gradient';
import ModelScreen from './ModelScreen';

export default function OrderHistorySeller() {
    const [Orders, setOrders] = useState([]);
    const { userData } = useContext(GlobalStateContext);
    const { show, hide, RenderModel } = ModelScreen();
    const [type, settype] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    function GetOrdersSeller() {
        console.log(userData);

        const contactinfo = {
            contactinfo: userData.contactinfo,
        };

        fetch(`${API_BASE_URL}:${ORDERSSELLER_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactinfo)
        })
            .then(response => response.json())
            .then(data => {
                console.log('data', data);
                if (data.status === "ok") {
                    setOrders(data.data);
                } else {
                    Alert.alert(data.data || "Failed");
                }
            })
            .catch(error => console.log("err", error));
    }

    useEffect(() => {
        GetOrdersSeller();
    }, []);

    const dialNumber = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity className=' px-4'>
                <View className=' rounded-lg flex-row drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
                    <LinearGradient
                        start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
                        colors={['transparent', Colors.dark.colors.backGroundColor]}
                        className=' -ml-1 flex-1 '
                    >
                        {/* borderColor: Colors.dark.colors.backGroundColor, borderBottomWidth: 3  */}
                        <View className='px-3 py-2 flex-row justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, }}>
                            <View className='flex-row'>
                                {/* <View className=' bg-white h-10 w-10' /> */}
                                <View>
                                    <Text className='text-xl font-black' style={{ color: Colors.dark.colors.mainTextColor }}>{item.name.contactinfo}</Text>
                                    <Text className='text-lg font-light' style={{ color: Colors.dark.colors.textColor }}>{item.date}</Text>
                                </View>
                            </View>
                            <View className='items-end'>
                                <Text className='text-xl font-black text-left' style={{ color: Colors.dark.colors.mainTextColor }}>Total ₹{item.totalPrice}</Text>
                                <Text className='text-lg font-light' style={{ color: Colors.dark.colors.diffrentColorOrange }}>Qty: {item.totalPrice}</Text>
                            </View>
                        </View>
                        <FlatList
                            className='px-3 py-2'
                            data={item.items.orders}
                            keyExtractor={(order) => order.id}
                            renderItem={({ item: order }) => (
                                <>

                                    <View className='flex-row justify-between items-center'>
                                        <View className='flex-row py-2'>
                                            {/* <View className=' w-14 overflow-hidden'> */}
                                            <Text className='font-black text-lg' style={{ color: Colors.dark.colors.mainTextColor }}>{order.item}</Text>
                                            {/* </View> */}
                                            <Text className='font-black text-lg' style={{ color: Colors.dark.colors.diffrentColorOrange }}>  ₹</Text>
                                            <Text className='font-black text-lg' style={{ color: Colors.dark.colors.mainTextColor }}>{order.price}</Text>
                                        </View>
                                        <View className='w-[40%] flex-row py-2 justify-between'>
                                            <View className=' flex-row overflow-hidden'>
                                                <Text className='font-black text-lg' style={{ color: Colors.dark.colors.diffrentColorOrange }}>X </Text>
                                                <Text className='font-black text-lg' style={{ color: Colors.dark.colors.mainTextColor }}>{order.quantity}</Text>
                                            </View>
                                            <Text className='font-black text-lg' style={{ color: Colors.dark.colors.diffrentColorOrange }}>{order.price * order.quantity}</Text>
                                        </View>
                                    </View>
                                </>
                            )}
                        />
                        {/* borderColor: Colors.dark.colors.backGroundColor, borderTopWidth: 3 */}
                        <View className='px-3 py-2' style={{}}>
                            <View className='flex-row mb-2 items-center'>
                                <Text className='text-base font-black' style={{ color: Colors.dark.colors.textColor }}>Massage: </Text>
                                <Text className='text-base font-light' numberOfLines={null} style={{ color: Colors.dark.colors.textColor }}>{item.massage == '' ? 'No Massage' : item.massage}</Text>
                            </View>

                            <View className='flex-row justify-between'>

                                <View className='flex-row items-center'>
                                    {/* <View className=' p-1 bg-black'> */}
                                    <Text className='text-base font-black' style={{ color: Colors.dark.colors.textColor }}>Order Status:  </Text>
                                    {/* onPress={() => { settype('status'), show() }} */}
                                    <TouchableOpacity className=' items-center flex-row p-1 rounded-sm px-2' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}>
                                        <Text className='text-base font-black' style={{ color: Colors.dark.colors.mainTextColor }}>{item.status} </Text>
                                        <Ionicons name="caret-down-outline" size={18} color={Colors.dark.colors.mainTextColor} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={() => dialNumber(item.name.contactinfo)} className=' flex-row p-1 rounded-sm px-3' style={{ backgroundColor: Colors.dark.colors.diffrentColorGreen }}>
                                    <Text className='text-base font-black' style={{ color: Colors.dark.colors.mainTextColor }}>Content</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View className='h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
            <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {console.log('Orders', JSON.stringify(Orders))}
                <View className=' mb-36'>
                    {Orders.length === 0 ? (
                        <View className='flex-1 justify-center items-center p-2' style={{ height: Dimensions.get('window').height * 0.8 }}>
                            <Ionicons name={'thumbs-down'} size={42} color={Colors.dark.colors.mainTextColor} />
                            <Text className='font-black text-xl text-center py-3' style={{ color: Colors.dark.colors.mainTextColor }}>
                                No Orders Yet? Seriously?
                            </Text>
                            <Text className='font-normal text-base text-center' style={{ color: Colors.dark.colors.textColor }}>
                                You haven't placed any orders yet. Don't miss out on our amazing items! Go ahead and fill up this space with delicious memories!
                            </Text>
                        </View>
                    ) : (
                        <>
                            <FlatList
                                data={Orders}
                                renderItem={renderItem}
                                keyExtractor={(item) => item._id}
                            />
                            {/* <Text style={styles.totalPrice}>Total Price of All Orders: ${totalPrice}</Text> */}
                        </>
                    )}
                </View>
            </ScrollView>
            {<RenderModel
                type={{ type: type }}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />}
            {/* {RenderModel({ type: { type }, selectedStatus: {selectedStatus}, setSelectedStatus: {setSelectedStatus} })} */}
        </View>
    );
}

const styles = StyleSheet.create({
    foodItemCollectionContainer: {
        marginTop: Dimensions.get('window').height * 0.02,
        gap: Dimensions.get('window').width * 0.04,
        // borderRadius: 2,
    },
    shadowProp: {
        backgroundColor: 'rgba(180, 180, 180, 0.1)',
        elevation: 30,
    },


    orderItem: {
        padding: 10,
        margin: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    orderName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderDetail: {
        padding: 5,
        marginVertical: 5,
        backgroundColor: '#eaeaea',
        borderRadius: 3,
    },
    totalPrice: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});