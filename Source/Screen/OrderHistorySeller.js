import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { ACCEPTORDER_ENDPOINT, API_BASE_URL, CHANGEORDERSTATUS_ENDPOINT, DECLINEORDER_ENDPOINT, ORDERSSELLER_ENDPOINT } from '../Constants/Constants';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import Colors from '../Components/Colors';
import TextStyles from '../Style/TextStyles';

export default function OrderHistorySeller() {
    const [orders, setOrders] = useState([]);
    const [noOrders, setNoOrders] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [timer, setTimer] = useState(0); // Timer state
    const { userData } = useContext(GlobalStateContext);

    const fontstyles = TextStyles();

    // Fetch orders for the seller
    const fetchOrders = async () => {
        const contactinfo = { contactinfo: userData.contactinfo };

        try {
            const response = await fetch(`${API_BASE_URL}:${ORDERSSELLER_ENDPOINT}`, {
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
        const intervalId = setInterval(() => {
            fetchOrders(); // Refresh orders every 10 seconds
        }, 10000); // Poll every 10 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);


    const interpolateColor = (percentage) => {
        // Adjust colors from green (start) to red (end)
        const r = Math.min(255, Math.max(0, Math.floor((percentage / 100) * 255)));
        const g = Math.min(255, Math.max(0, Math.floor((1 - percentage / 100) * 255)));
        const b = 0;

        return `rgb(${r},${g},${b})`;
    };

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


    // Accept an order and set timer (merged backend call)
    const acceptOrder = async (orderId, timer) => {
        try {
            const response = await fetch(`${API_BASE_URL}:${ACCEPTORDER_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, timer }), // Pass both orderId and timer
            });

            const data = await response.json();
            if (data.status === 'ok') {
                fetchOrders(); // Refresh the orders after accepting
                setModalVisible(false); // Close the modal
            } else {
                console.error('Error accepting order:', data);
            }
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    // Chnage an order Status (Call backend /declineOrder)

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
                setModalVisible(false); // Close the modal
            } else {
                console.error('Error declining order:', data);
            }
        } catch (error) {
            console.error('Error declining order:', error);
        }
    };

    // Decline an order (Call backend /declineOrder)
    const declineOrder = async (orderId) => {
        try {
            const response = await fetch(`${API_BASE_URL}:${DECLINEORDER_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                fetchOrders(); // Refresh the orders after declining
                setModalVisible(false); // Close the modal
            } else {
                console.error('Error declining order:', data);
            }
        } catch (error) {
            console.error('Error declining order:', error);
        }
    };

    const renderOrderItem = ({ item }) => {
        const { minutes, seconds, persent } = getRemainingTime(item.startTime, item.timer); // Calculate the remaining time
        const persentBackgroundColor = persent;

        return (
            <View style={styles.orderContainer}>
                <View className='flex-row justify-between'>
                    <View>
                        <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>Order ID</Text>
                        <Text style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>{item.id}</Text>
                    </View>
                    <View className='items-end'>
                        <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>Order Status</Text>
                        <Text style={[fontstyles.number, { fontSize: 16, color: Colors.dark.colors.diffrentColorOrange }]}>{item.status}</Text>
                    </View>
                </View>

                {item?.items?.orders?.map((order, index) => {
                    return (
                        <View key={`${order.id}_${index}`} className='flex-row justify-between'>
                            <Text style={[fontstyles.h4, { fontSize: 20, }]} className='text-white'>
                                {order.quantity} x {order.item}
                            </Text>
                            <Text style={[fontstyles.number, { fontSize: 15, }]} className='text-white'>
                                ₹ {order.quantity * order.price}
                            </Text>
                        </View>
                    );
                })}

                <View className=' my-3 flex-row '>
                    <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>Total Amount:  </Text>
                    <Text style={[fontstyles.number, { fontSize: 16, color: Colors.dark.colors.mainTextColor, marginTop: 5 }]}>₹ {item.totalPrice}</Text>
                </View>

                {
                    item.status !== "Scheduled" ? (
                        item.status === "Prepared" ? (
                            <TouchableOpacity
                                onPress={() => {
                                    changeOrderStatus(item.id, "Delivered"); // Mark the order as delivered
                                }}
                                style={[
                                    {
                                        paddingVertical: 10,
                                        borderRadius: 5,
                                        backgroundColor: Colors.dark.colors.diffrentColorPerpleBG,
                                    },
                                ]}
                                className="bg-white overflow-hidden flex-row items-center justify-center"
                            >
                                <Text style={[fontstyles.number]} className="text-black text-center uppercase mr-2">
                                    Waiting for User to Receive
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: Colors.dark.colors.diffrentColorPerple,
                                        width: `${persentBackgroundColor}%`,
                                    }}
                                    className="-z-10 absolute top-0 left-0 h-20"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    changeOrderStatus(item.id, "Prepared"); // Mark the order as prepared
                                }}
                                style={[
                                    {
                                        paddingVertical: 10,
                                        borderRadius: 5,
                                        backgroundColor: Colors.dark.colors.diffrentColorPerpleBG,
                                    },
                                ]}
                                className="bg-white overflow-hidden flex-row items-center justify-center"
                            >
                                <Text style={[fontstyles.number]} className="text-black text-center uppercase mr-2">
                                    Ready Order
                                </Text>
                                <Text style={[fontstyles.number]} className="text-black text-center">
                                    ({minutes}m {seconds}s)
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: Colors.dark.colors.diffrentColorPerple,
                                        width: `${persentBackgroundColor}%`,
                                    }}
                                    className="-z-10 absolute top-0 left-0 h-20"
                                />
                            </TouchableOpacity>
                        )
                    ) : (
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.acceptButton]}
                                onPress={() => openModal(item, "Accept")}
                            >
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.declineButton]}
                                onPress={() => {
                                    declineOrder(item.id); // Decline the order
                                }}
                            >
                                <Text style={styles.buttonText}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </View>
        );
    };

    // Open modal to accept/decline and set timer
    const openModal = (order, action) => {
        setSelectedOrder(order);
        setTimer(0); // Reset timer to 0
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {noOrders ? (
                <Text style={styles.noOrdersText}>No orders yet</Text>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item?.id?.toString()}
                />
            )}


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {selectedOrder ? `Order #${selectedOrder.id}` : 'Order'}
                        </Text>
                        <Text style={styles.modalSubtitle}>Set Timer (0-60 minutes)</Text>

                        <Slider
                            value={timer}
                            onValueChange={txt => setTimer(txt)}
                            minimumValue={0}
                            maximumValue={60}
                            step={1}
                            style={{ width: 200, height: 40 }}
                        />
                        <Text style={styles.timerText}>{timer} minutes</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.setTimerButton}
                                onPress={() => {
                                    if (selectedOrder) {
                                        acceptOrder(selectedOrder.id, timer); // Accept the order and set the timer
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    noOrdersText: {
        fontSize: 18,
        color: Colors.dark.colors.mainTextColor,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.dark.colors.bbackGroundColor,
    },
    orderContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: Colors.dark.colors.shadowcolor,
        borderRadius: 8,
        // borderWidth: 1,
    },
    orderDetails: {
        marginBottom: 10,
    },
    orderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.dark.colors.mainTextColor,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    acceptButton: {
        backgroundColor: Colors.dark.colors.diffrentColorGreen,
    },
    declineButton: {
        backgroundColor: Colors.dark.colors.diffrentColorRed,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        marginBottom: 15,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timerText: {
        fontSize: 16,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    setTimerButton: {
        backgroundColor: Colors.dark.colors.diffrentColorGreen,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 5,
        flex: 1,
        marginRight: 10,
    },
    cancelButton: {
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.dark.colors.diffrentColorGreen,
        borderRadius: 5,
    },
});