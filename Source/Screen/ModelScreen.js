import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Button, ScrollView, Image, StatusBar, Dimensions, FlatList } from 'react-native';
// import { GlobalStateContext } from '../Context/GlobalStateContext';
import Colors from '../Components/Colors';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { useNavigation } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { avalableLanguages } from '../Data/avalableLanguages';
import LangContent from '../Components/RenderLangContent';
import RenderCartItem from '../Components/RenderCartContent';

export default function ModelScreen() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const { CartItems, updatedCartWithDetails } = useContext(GlobalStateContext);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const [langunage, setlanguage] = useState("");
    const [selected, setSelected] = useState('English');

    const RenderModel = ({ type }) => (
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

                    <View className=' absolute w-full bottom-0 p-3' style={{ maxHeight: 400, borderTopRightRadius: 21, borderTopLeftRadius: 21, backgroundColor: Colors.dark.colors.backGroundColor }}>
                        <View className='flex-row justify-between p-1 pb-3 items-center'>
                            <Text style={{ color: Colors.dark.colors.mainTextColor, fontWeight: 'bold', fontSize: 20 }}>
                                {type.type === "lang" ? "Select Language" : `Your Carts ${updatedCartWithDetails.length}`}
                            </Text>
                            <Text style={{ color: Colors.dark.colors.textColor }} className='font-black text-base'>{type.type == "lang" ? null : "Clear All"}</Text>
                        </View>
                        {/* {
                            type.type == "cart" ? ( */}
                        <FlatList
                            data={type.type === "lang" ? avalableLanguages : updatedCartWithDetails}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1, backgroundColor: Colors.dark.colors.backGroundColor }}
                            contentContainerStyle={{ justifyContent: 'center' }}
                            renderItem={({ item }) => (
                                type.type === "lang" ?
                                    <LangContent item={item} selected={selected} setSelected={setSelected} />
                                    :
                                    <RenderCartItem item={item} setVisible={setVisible} navigation={navigation} />
                            )}
                        />
                        {/* ) : (
                                <FlatList
                                    data={avalableLanguages}
                                    renderItem={({ item }) => (
                                        
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    style={{ flex: 1, backgroundColor: Colors.dark.colors.componentColor }}
                                    contentContainerStyle={{ justifyContent: 'center' }}
                                />
                            )
                        } */}
                    </View>

                </View>
            </Modal>
        </>
    );

    return { show, hide, RenderModel };
}
