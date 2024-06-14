import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Content = ({ data }) => {
    const navigation = useNavigation();

    const navToDetails = (item) => {
        navigation.navigate("Details", { data: item });
    };

    const renderItem = ({ item }) => (
        <View className='mb-2 drop-shadow-2xl' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
            <TouchableOpacity activeOpacity={1} onPress={() => navToDetails(item)}>
                <View style={styles.foodItemContainer}>
                    <View className=' w-full h-44'>
                        <Image
                            source={{
                                uri: item.image,
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache',
                                },
                            }}
                            className=' w-full h-44'
                            alt="Logo"
                        />
                        <Text className=' left-3 top-3 absolute p-1 rounded-md bg-zinc-900 text-stone-50'>{item.name}</Text>

                        <View className=' flex-row items-center left-0 bottom-0 absolute w-2/5 h-7 rounded-tr-md bg-stone-50 text-stone-50'>
                            <Ionicons name="location" size={20} color={'blue'} />
                            <Text className='text-blue-600'>{item.location}</Text>
                        </View>

                    </View>
                    <View className='flex-row justify-between p-3'>
                        <View className='flex-1'>
                            <Text className='text-3xl font-semibold'>{item.name}</Text>
                            <View className='flex-row gap-2 items-center mb-2'>
                                <View className='flex-row justify-center items-center'>
                                    <Text className='text-base ml-1'>{item.type}</Text>
                                </View>
                                <Ionicons name="ellipse" size={5} />
                                <Text className='text-base'>{item.menutype}</Text>
                            </View>
                        </View>
                        <View>
                            <View className=' flex-row justify-center items-center bg-green-600 rounded-lg px-2'>
                                <Text className='text-lg font-semibold mr-1 text-white flex'>{item.rating}</Text>
                                <Ionicons name="star" color={'white'} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        </View >
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    shadowProp: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        // shadowOffset: {
        //   width: 0,
        //   height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,
        elevation: 30,

    },
    foodItemCollectionContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.03,
        marginTop: Dimensions.get('window').height * 0.02,
        gap: Dimensions.get('window').width * 0.04,
        backgroundColor: 'white',
        borderRadius: 18,
    },
    foodItemContainer: {
        overflow: 'hidden',
        backgroundColor: "white",
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 15,
        // height: Dimensions.get('window').height * 0.30,
        // width: Dimensions.get('window').width * 0.30,
    },
    txt: {
        color: '#40A578',
    },
    popularFeatureImage: {
        // resizeMode: 'contain',
        height: '100%',
        width: '57%', // Adjust width for responsiveness
        borderWidth: 2,
        borderColor: '#114232', // border color
        borderRadius: 14,
    },
});

export default Content;
