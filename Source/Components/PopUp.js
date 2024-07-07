import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    Image,
    Animated,
    Easing
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import FoodIcon from "./FoodIcon";
import { Ionicons } from "@expo/vector-icons";
import FoodTypeIcon from "./FoodTypeIcon";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import Colors from "./Colors";
import { GlobalStateContext } from "../Context/GlobalStateContext";

const PopUp = () => {
    const slideAnim = useRef(new Animated.Value(500)).current;
    const navigation = useNavigation();
    const [Openmodal, setOpenmodal] = useState(false);

    const { CartItems, setCartItems } = useContext(GlobalStateContext);

    const renderAddToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };
    
    useEffect(() => {
        if (Openmodal) {
            Animated.timing(slideAnim, {
                toValue: 0, // Slide to this position
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 500, // Slide back to initial position
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
    }, [Openmodal]);

    const renderModal = ({ data }) => {
        if (!data) {
            return null; // Add this check
        }

        return (
            <Modal visible={Openmodal} animationType="fade" transparent={true} statusBarTranslucent>
                <View style={styles.container} className='blur-sm'>
                    <TouchableOpacity style={[styles.background, { zIndex: 1 }]} onPress={() => setOpenmodal(false)} />

                    <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]} className=' overflow-hidden'>
                        <TouchableOpacity style={{ zIndex: 1 }} onPress={() => setOpenmodal(false)}>
                            <Ionicons name="close-circle" size={42} color={'black'} style={{ position: 'absolute', right: 12, top: 12, padding: 5 }} />
                        </TouchableOpacity>

                        <View className=' h-72 w-full'>
                            <Image
                                source={{
                                    uri: data.image,
                                    method: 'POST',
                                    headers: {
                                        Pragma: 'no-cache',
                                    },
                                }}
                                defaultSource={require('./../../assets/favicon.png')}
                                className=' h-full w-full'
                                // style={styles.popularFeatureImage}
                                alt="Logo"
                            />
                            <View className='w-full absolute bottom-0 p-4 rounded-t-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.60)' }}>
                                <View className=' flex-row justify-between'>
                                    <View>
                                        <Text className=' text-xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>{data.item}</Text>
                                        {/* <Text className=' text-lg font-medium'>Item Name</Text> */}
                                    </View>
                                    <View className=' flex-row gap-3'>
                                        <TouchableOpacity style={{ backgroundColor: 'black' }} className=' rounded-full border-2 p-1'>
                                            <Ionicons name="heart-outline" size={20} color={'red'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: 'black' }} className=' rounded-full border-2 p-1'>
                                            <Ionicons name="arrow-redo-outline" size={20} color={'blue'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View className='flex-row'>
                                    {
                                        data.type &&
                                        <FoodIcon style={{ backgroundColor: 'black' }} type={data.type} size={16} padding={2} />
                                    }
                                    {
                                        data.category.split('_').map((part, index) => (
                                            <FoodTypeIcon key={index} type={part} size={18} padding={6} />
                                        ))
                                    }
                                </View>
                            </View>
                        </View>

                        <View className=' p-4'>
                            <Text className=' text-xl font-semibold'>Description</Text>
                            <Text className=' text-base font-normal py-2'>{data.description}</Text>
                            <View className=' flex-row justify-between'>
                                <TouchableOpacity className=' rounded-lg items-center justify-center w-[33%] py-3 px-10 bg-green-600' onPress={() => setOpenmodal(false)}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        renderAddToCart(data.item);
                                        setOpenmodal(false);
                                    }}
                                    className='rounded-lg items-center justify-center w-[63%] py-3 px-10 bg-green-600'
                                >
                                    <Text style={styles.buttonText}>Add item ₹{data.price}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        );
    };

    return { Openmodal, setOpenmodal, renderModal };
};


const styles = {

    // background: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     backgroundColor: 'transparent',
    //     zIndex: 1,
    // },

    container: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.63)',
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    modalContent: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        backgroundColor: "white",
    },
    itemContainer: {
        // marginTop: "7%",
        marginBottom: "5%",
        flexDirection: "row",
        height: "51%",
        gap: 16,
    },

    itemTouchable: {
        width: "28%",
        gap: 0.2,
    },

    planBox: {
        height: "55%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },

    planText: {
        color: "black",
        fontWeight: "800",
        fontSize: 21,
    },

    priceBox: {
        height: "55%",
        backgroundColor: "grey",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    priceText: {
        color: "black",
        fontWeight: "800",
        fontSize: 21,
    },

    priceDetailText: {
        color: "black",
        fontWeight: "500",
        fontSize: 13,
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 12
    },

    button: {
        borderRadius: 8,
        height: 50,
        backgroundColor: "green",
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        // alignSelf: "center",
    },

    buttonText: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        // letterSpacing: 1,
        // textDecorationLine: "underline",
    },
    popularFeatureImage: {
        // resizeMode: 'contain',
        height: '100%',
        width: '57%', // Adjust width for responsiveness
        borderWidth: 2,
        borderColor: '#114232', // border color
        borderRadius: 14,
    },
}

export default PopUp;
