import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Button, ScrollView, Image, StatusBar, Dimensions, FlatList } from 'react-native';
// import { GlobalStateContext } from '../Context/GlobalStateContext';
import Colors from '../Components/Colors';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useNavigation } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { avalableLanguages } from '../Data/avalableLanguages';
import LangContent from '../Components/LangCantent';

export default function ModelScreen() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const { CartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const [langunage, setlanguage] = useState("");
    const [selected, setSelected] = useState('English');
    
    const RenderModel = ({ title, subtitle, type }) => (
        <>
            {/* <StatusBar hidden /> */}
            <Modal
                visible={visible}
                onRequestClose={hide}
                animationType="fade"
                transparent
            >
                <View className=' w-full h-full' style={{ flex: 1, backgroundColor: 'rgba(355, 355, 355, 0.3)' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => { hide() }} />

                    <View className=' absolute w-full bottom-0 p-3' style={{ maxHeight: 400, borderTopRightRadius: 21, borderTopLeftRadius: 21, backgroundColor: Colors.dark.colors.componentColor }}>
                        <View className='flex-row justify-between p-1 pb-3 items-center'>
                            <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-xl'>{title} ({updatedCartWithDetails.length})</Text>
                            <Text style={{ color: Colors.dark.colors.textColor }} className='font-black text-base'>{subtitle}</Text>
                        </View>
                        {
                            type === "cart" ? (
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
                                                                {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0)} {' '}
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
                            ) : (
                                <FlatList
                                    data={avalableLanguages}
                                    renderItem={({ item }) => (
                                        <LangContent item={item} selected={selected} setSelected={setSelected} />
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    style={{ flex: 1, backgroundColor: Colors.dark.colors.componentColor }}
                                    contentContainerStyle={{ justifyContent: 'center' }}
                                />
                            )
                        }
                    </View>

                </View>
            </Modal>
        </>
    );

    return { show, hide, RenderModel };
}
