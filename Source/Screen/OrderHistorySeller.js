import { View, Text, Dimensions, Alert, FlatList, StyleSheet, TouchableOpacity, Linking, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Colors from '../Components/Colors';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL, ORDERS_ENDPOINT, ORDERSSELLER_ENDPOINT } from '../Constants/Constants';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { LinearGradient } from 'expo-linear-gradient';
import ModelScreen from './ModelScreen';

export default function OrderHistorySeller() {
    const [Orders, setOrders] = useState([]);
    const { userData } = useContext(GlobalStateContext);
    const { show, hide, RenderModel } = ModelScreen();
    const [type, settype] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    async function createOrder(orderData) {
        console.log('orderData', orderData)

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

    // useEffect(() => {
    //     GetOrdersSeller();
    // }, []);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            GetOrdersSeller();
        }, 10000); // Poll every 10 seconds
    
        return () => clearInterval(intervalId); // Cleanup on unmount
      }, []);

    const dialNumber = (input) => {
        if (input.includes('@gmail.c')) {
            // Handle email
            Linking.openURL(`mailto:${input}`);
        } else {
            // Handle phone number
            Linking.openURL(`tel:${input}`);
        }
    };

    const OrderStatusDropdown = ({ order, item, onChangeStatus }) => {
        console.log('order', order)
        const [modalVisible, setModalVisible] = useState(false);
        const [selectedStatus, setSelectedStatus] = useState(item.status);

        const statuses = [
            // "Pending",
            // "Processing",
            // "Shipped",
            // "Delivered",
            
            "Scheduled",
            "Not Started",
            "In Progress",
            "On Hold",
            "Delayed",
            "Finished"
        ];

        const handleStatusChange = (status) => {
            setSelectedStatus(status);
            createOrder({
                id: order.id,
                items: order.items,
                // name: userData,    
                massage: order.massage,
                totalPrice: order.totalPrice,
                // Noformatdate: today,
                date: order.date,
                status: status,
                name: order.name,
            })
            // onChangeStatus(status);
            setModalVisible(false);
        };

        return (
            <View>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className='items-center flex-row p-1 rounded-sm px-2'
                    style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}
                >
                    <Text className='text-base font-black' style={{ color: Colors.dark.colors.mainTextColor }}>
                        {selectedStatus}
                    </Text>
                    <Ionicons name="caret-down-outline" size={18} color={Colors.dark.colors.mainTextColor} />
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className="flex-1 justify-center items-center">
                        <View className="w-3/4 bg-white rounded-lg p-4">
                            {statuses.map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    onPress={() => handleStatusChange(status)}
                                    className="py-2"
                                >
                                    <Text className="text-lg">{status}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="mt-4 py-2 bg-gray-200 rounded-lg"
                            >
                                <Text className="text-center text-lg">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    const renderItem = ({ item, onChangeStatus }) => {
        return (
            <TouchableOpacity className='px-4'>
                <View className='rounded-lg flex-row drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
                    <LinearGradient
                        start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
                        colors={['transparent', Colors.dark.colors.backGroundColor]}
                        className='-ml-1 flex-1'
                    >
                        <View className='px-3 py-2 flex-row justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                            <View className='flex-row'>
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
                                <View className='flex-row justify-between items-center'>
                                    <View className='flex-row py-2'>
                                        <Text className='font-black text-lg' style={{ color: Colors.dark.colors.mainTextColor }}>{order.item}</Text>
                                        <Text className='font-black text-lg' style={{ color: Colors.dark.colors.diffrentColorOrange }}> ₹</Text>
                                        <Text className='font-black text-lg' style={{ color: Colors.dark.colors.mainTextColor }}>{order.price}</Text>
                                    </View>
                                    <View className='w-[40%] flex-row py-2 justify-between'>
                                        <View className='flex-row overflow-hidden'>
                                            <Text className='font-black text-lg' style={{ color: Colors.dark.colors.diffrentColorOrange }}>X </Text>
                                            <Text className='font-black text-lg' style={{ color: Colors.dark.colors.mainTextColor }}>{order.quantity}</Text>
                                        </View>
                                        <Text className='font-black text-lg' style={{ color: Colors.dark.colors.diffrentColorOrange }}>{order.price * order.quantity}</Text>
                                    </View>
                                </View>
                            )}
                        />
                        <View className='px-3 py-2'>
                            <View className='flex-row mb-2 items-center'>
                                <Text className='text-base font-black' style={{ color: Colors.dark.colors.textColor }}>Massage: </Text>
                                <Text className='text-base font-light' numberOfLines={null} style={{ color: Colors.dark.colors.textColor }}>{item.massage === '' ? 'No Massage' : item.massage}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <View className='flex-row items-center'>
                                    <Text className='text-base font-black' style={{ color: Colors.dark.colors.textColor }}>Order Status: </Text>
                                    <OrderStatusDropdown order={item} item={item} onChangeStatus={(status) => onChangeStatus(item.id, status)} />
                                    {/* onPress={() => { settype('status'), show() }} */}
                                </View>
                                <TouchableOpacity
                                    onPress={() => dialNumber(item.name.contactinfo)}
                                    className='flex-row p-1 rounded-sm px-3'
                                    style={{ backgroundColor: Colors.dark.colors.diffrentColorGreen }}
                                >
                                    <Text className='text-base font-black' style={{ color: Colors.dark.colors.mainTextColor }}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        );
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