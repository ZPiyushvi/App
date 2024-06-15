import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import Colors from './Colors';
import { LinearGradient } from 'expo-linear-gradient';
import TruncatedTextComponent from './TruncatedTextComponent';
import Icons from './Icons';
import FoodIcon from './FoodIcon';
import CoffeeCard from './CoffeeCart';

const Content = ({ data }) => {
    const { StarIcon, CarIcon } = Icons();
    const navigation = useNavigation();

    const navToDetails = (item) => {
        navigation.navigate("Details", { data: item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={1} onPress={() => navToDetails(item)}>
            <LinearGradient
                className='mb-2 drop-shadow-2xl overflow-hidden p-2'
                colors={[Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor]}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                style={[styles.foodItemContainer1, { marginTop: Dimensions.get('window').width * 0.04, marginHorizontal: Dimensions.get('window').width * 0.06, height: Dimensions.get('window').height * 0.30 }]}>
                <ImageBackground
                    source={{
                        uri: item.image,
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache',
                        },
                    }}
                    className=' h-full w-full overflow-hidden '
                    alt="Logo"
                    resizeMode='cover'
                    style={{ flex: 1, borderRadius: 12 }}
                >
                    {/* <LinearGradient className='overflow-hidden h-full w-full' colors={[Colors.dark.colors.backGroundColor, 'transparent']}> */}
                    <View className='absolute top-1 right-2 flex-row'>
                        <View className='rounded-xl justify-center items-center px-2 flex-row' style={{ height: Dimensions.get('window').height * 0.04, backgroundColor: 'rgba(5, 6, 8, 0.87)' }}>
                            {StarIcon()}
                            <Text className=' text-lg font-semibold' style={{ color: Colors.dark.colors.textColor }}> {item.rating} ({item.ratingcount}+)</Text>
                        </View>
                    </View>

                    <View className=' absolute bottom-0 w-full' >
                        {/* <View className='flex-row'>
                            <View className='w-5/12 pt-1 pl-1 flex-row' style={{ borderTopRightRadius: 40, height: Dimensions.get('window').height * 0.04, backgroundColor: 'rgba(52, 52, 52, 0.77)' }}>
                                <View className={`rounded-full flex-row justify-center items-center bg-green-500`} style={{ width: Dimensions.get('window').height * 0.03, height: Dimensions.get('window').height * 0.03 }}>
                                    <Ionicons name="star" size={15} color={Colors.dark.colors.mainTextColor} />
                                </View>
                                <Text className=' text-xl font-semibold'> {item.rating} ({item.ratingcount}+)</Text>
                            </View>
                        </View> */}

                        <LinearGradient
                            style={{ height: Dimensions.get('window').height * 0.10, backgroundColor: Colors.dark.colors.componentColor }}
                            colors={[Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor]}
                            start={{ x: 0.25, y: 0.25 }} end={{ x: 0.7, y: 2.0 }}
                            className=' p-2'
                        >
                            <Text className='font-extrabold text-2xl -mb-1' style={{ color: Colors.dark.colors.mainTextColor }}>
                                {item.name}
                            </Text>
                            <View className='font-semibold text-sm flex-row items-center' >
                                <Text style={{ color: Colors.dark.colors.textColor }} className='text-base '>{item.type}</Text>
                                <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                                <Text style={{ color: Colors.dark.colors.textColor }} className='text-base'>{item.menutype}</Text>
                            </View>
                        </LinearGradient>

                    </View>
                </ImageBackground>
            </LinearGradient>
        </TouchableOpacity>
    );

    const renderItem1 = ({ item }) => (
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

    const renderItem2 = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => navToDetails(item)}>
                <View style={styles.renderItem2itemContainer}>
                    <CoffeeCard data={item} />
                </View>
            </TouchableOpacity>
        )
    };

    const renderItem3 = ({ item }) => (
        <TouchableOpacity activeOpacity={1} onPress={() => navToDetails(item)}>
            <View className='flex-row mb-2 drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
                <TouchableOpacity>
                    <View className='overflow-hidden' style={styles.foodItemContainer}>
                        <ImageBackground
                            source={{
                                uri: item.image,
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache',
                                },
                            }}
                            className=' h-full w-full overflow-hidden'
                            alt="Logo"
                            resizeMode='cover'
                            style={{ flex: 1, justifyContent: 'center', }}
                        >
                            <LinearGradient
                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
                                className='overflow-hidden h-full w-full'
                                colors={['transparent', Colors.dark.colors.backGroundColor]}
                            >
                                {/* <View className='absolute bottom-1 p-2'>
                                <Text className='font-extrabold text-xl -mb-1' style={{ color: Colors.dark.colors.mainTextColor }}>
                                    {TruncatedTextComponent(item.name, 6)}
                                </Text>
                                <Text className='font-semibold text-sm' style={{ color: Colors.dark.colors.textColor }}>
                                    {TruncatedTextComponent(item.name, 11)}
                                </Text>
                            </View> */}
                            </LinearGradient>
                            <View className='absolute bottom-2 right-2'>
                                <View className='flex-row justify-center items-center'>
                                    {
                                        item.type === "Veg" &&
                                        <>
                                            <Text style={{ color: '#00e676' }} className='text-base font-semibold mr-1'>Pure {item.type}</Text>
                                            <Ionicons name="leaf" size={18} color={'#00e676'} />
                                        </>
                                    }
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>

                <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.8, y: 1 }}
                    colors={['transparent', Colors.dark.colors.backGroundColor]}
                    className=' -ml-1 flex-1 justify-center '
                >
                    <Text className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>
                        {/* {item.name} */}
                        {TruncatedTextComponent(item.name, 15)}
                    </Text>
                    <View className='flex-row'>
                        <View className='rounded-xl justify-center items-center flex-row' style={{ height: Dimensions.get('window').height * 0.04 }}>
                            {StarIcon()}
                            <Text className=' text-base font-semibold' style={{ color: Colors.dark.colors.mainTextColor }}> {item.rating} ({item.ratingcount}+)</Text>
                        </View>
                    </View>
                    <View className='font-extralight text-sm flex-row items-center' >
                        <Text style={{ color: Colors.dark.colors.textColor }} className='text-base '>{item.type}</Text>
                        <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                        <Text style={{ color: Colors.dark.colors.textColor }} className='text-base'>{item.menutype}</Text>
                    </View>
                    <LinearGradient
                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.7, y: 1.0 }}
                        colors={[Colors.dark.colors.backGroundColor, 'transparent']}
                        className=' w-44 mt-4 font-semibold text-sm flex-row items-center p-2 rounded-l-full flex'
                    >
                        {CarIcon()}
                        <Text style={{ color: Colors.dark.colors.diffrentColorPerple }} className=' font-black uppercase text'>  {item.location}</Text>
                    </LinearGradient>

                </LinearGradient>
            </View>
        </TouchableOpacity>
    );

    return (

        // 2 row fromat design

        <View style={styles.renderItem2container}>
            <View>
                <FlatList
                    data={data}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
                    columnWrapperStyle={{
                        justifyContent: 'space-around'
                    }}
                    renderItem={renderItem2}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>

        // large fromat design (Zomato) 

        // <FlatList
        //     data={data}
        //     renderItem={renderItem}
        //     keyExtractor={(item, index) => index.toString()}
        //     showsHorizontalScrollIndicator={false}
        // />

        // 2 design (Swggi) 

        // <FlatList
        //     data={data}
        //     renderItem={renderItem3}
        //     keyExtractor={(item, index) => index.toString()}
        //     showsHorizontalScrollIndicator={false}
        // />
    );
};

const styles = StyleSheet.create({
    renderItem2container: {
        flex: 1,
        paddingHorizontal: 6,
        paddingTop: 16,
    },
    renderItem2itemContainer: {
        marginBottom: 20,
    },

    foodItemContainer1: {
        backgroundColor: Colors.dark.colors.textColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: Dimensions.get('window').height * 0.18,
        // width: Dimensions.get('window').height * 0.14,
    },

    foodItemContainer: {
        backgroundColor: Colors.dark.colors.textColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: Dimensions.get('window').height * 0.22,
        width: Dimensions.get('window').height * 0.18,
    },

    shadowProp: {
        backgroundColor: 'rgba(180, 180, 180, 0.1)',
        // shadowOffset: {
        //   width: 0,
        //   height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,
        elevation: 30,

    },
    foodItemCollectionContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.07,
        marginTop: Dimensions.get('window').height * 0.02,
        gap: Dimensions.get('window').width * 0.04,
        // backgroundColor: 'white',
        borderRadius: 18,
    },
    // foodItemContainer: {
    //     overflow: 'hidden',
    //     backgroundColor: "white",
    //     // justifyContent: 'center',
    //     // alignItems: 'center',
    //     borderRadius: 15,
    //     // height: Dimensions.get('window').height * 0.30,
    //     // width: Dimensions.get('window').width * 0.30,
    // },
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