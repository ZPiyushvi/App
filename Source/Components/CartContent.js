// CartContent.js
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Components/Colors';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useNavigation } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';

const CartContent = ({ setVisible }) => {
    const navigation = useNavigation();
    const { updatedCartWithDetails } = React.useContext(GlobalStateContext);

    return (
        <View className='absolute w-full bottom-0 p-3' style={{ maxHeight: 400, borderTopRightRadius: 21, borderTopLeftRadius: 21, backgroundColor: Colors.dark.colors.componentColor }}>
            <View className='flex-row justify-between p-1 pb-3 items-center'>
                <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-xl'>
                    Your Carts {`(${updatedCartWithDetails.length})`}
                </Text>
                <Text style={{ color: Colors.dark.colors.textColor }} className='font-black text-base'>Clear All</Text>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <View className='justify-center' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                    {updatedCartWithDetails.map(({ storeName, storeDetails, items, totalPrice }) => (
                        <View
                            key={storeName}
                            className='rounded-xl p-2 mt-3 flex-row'
                            style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
                        >
                            <Image
                                source={{
                                    uri: storeDetails.image,
                                    method: 'POST',
                                    headers: {
                                        Pragma: 'no-cache',
                                    },
                                }}
                                defaultSource={require('./../../assets/favicon.png')}
                                className='w-12 h-12 rounded-full mr-2'
                                alt="Logo"
                            />
                            <View>
                                <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-lg'>
                                    {TruncatedTextComponent(storeName, 13)}
                                </Text>
                                <View className='flex-row items-center'>
                                    <Text style={{ color: Colors.dark.colors.textColor }} className='font-semibold text-base underline'>
                                        View Full Menu
                                    </Text>
                                    <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} />
                                </View>
                            </View>
                            <View className='flex-row gap-x-2 absolute right-2 top-2 h-full'>
                                <TouchableOpacity
                                    className='justify-center items-center rounded-lg'
                                    style={{ width: Dimensions.get('window').width * 0.3, backgroundColor: Colors.dark.colors.diffrentColorOrange }}
                                    onPress={() => {
                                        setVisible(false);
                                        navigation.navigate('IndiviualCart', { storeName, items, totalPrice, storeDetails });
                                    }}
                                >
                                    <View className='flex-row items-center justify-center'>
                                        <Text className='font-normal text-sm' style={{ color: Colors.dark.colors.mainTextColor }}>
                                            {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0)}{' '}
                                            {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0) === 1 ? 'item' : 'items'}
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
                                <View className='items-center justify-center'>
                                    <TouchableOpacity
                                        className='rounded-full p-1 items-center justify-center'
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
            </ScrollView>
            </View>
    );
};

export default CartContent;
