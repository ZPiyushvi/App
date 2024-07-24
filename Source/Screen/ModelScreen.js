import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
// import { GlobalStateContext } from '../Context/GlobalStateContext';
import Colors from '../Components/Colors';
import { useNavigation } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { avalableLanguages } from '../Data/avalableLanguages';
import LangContent from '../Components/RenderLangContent';
import RenderStatusContent from '../Components/RenderStatusContent';
import RenderCartContent from '../Components/RenderCartContent';
import { availableStatus } from '../Data/availableStatus';

export default function ModelScreen() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const { CartItems, updatedCartWithDetails, cartItemsNEW } = useContext(GlobalStateContext);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const [langunage, setlanguage] = useState("");
    const [selected, setSelected] = useState('English');

    const RenderModel = ({ type, selectedStatus, setSelectedStatus }) => {
        const getText = () => {
            if (type.type === "lang") {
                return 'Select Language';
            } else if (type.type === "status") {
                return 'Select Status';
            } else {
                return `Your Carts ${cartItemsNEW.length}`;
            }
        };

        const getData = () => {
            if (type.type === "lang") {
                return avalableLanguages;
            } else if (type.type === "status") {
                return availableStatus;
            } else {
                return cartItemsNEW;
            }
        };

        return (
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
                                    {/* {type.type === "lang" ? "Select Language" : `Your Carts ${cartItemsNEW.length}`} */}
                                    {getText()}
                                </Text>
                                <Text style={{ color: Colors.dark.colors.textColor }} className='font-black text-base'>{type.type == "lang" && "Clear All"}</Text>
                            </View>
                            {/* {
                            type.type == "cart" ? ( */}
                            <FlatList
                                data={getData()}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                style={{ flex: 1, backgroundColor: Colors.dark.colors.backGroundColor }}
                                contentContainerStyle={{ justifyContent: 'center' }}
                                renderItem={({ item }) => {
                                    if (type.type === "lang") {
                                        return <LangContent item={item} selected={selected} setSelected={setSelected} />;
                                    } else if (type.type === "status") {
                                        return <RenderStatusContent item={item} selected={selectedStatus} setSelected={setSelectedStatus} setVisible={setVisible} navigation={navigation} />;
                                    } else {
                                        return <RenderCartContent item={item} setVisible={setVisible} navigation={navigation} />;
                                    }
                                }}
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
        )
    };

    return { show, hide, RenderModel };
}
