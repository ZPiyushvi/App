import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "./Colors";
import Icons from "./Icons";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import TruncatedTextComponent from "./TruncatedTextComponent";
import TextStyles from "../Style/TextStyles";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../Context/GlobalStateContext";

const { StarIcon, CarIcon } = Icons();

// --------------------------- HOW TO USE ----------------------------- //

// <View style={styles.renderItem2container}>
//     <View>
//         <FlatList
//             data={data}
//             numColumns={2}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
//             columnWrapperStyle={{
//                 justifyContent: 'space-around'
//             }}
//             renderItem={({ item }) => <ListCard_S item={item} />}
//             keyExtractor={(item, index) => index.toString()}
//             showsHorizontalScrollIndicator={false}
//         />
//     </View>
// </View>

// < FlatList
//     data={data}
//     renderItem={({ item }) => <ListCard_Z item={item} />} // ListCard_O && ListCard_Z
//     keyExtractor={(item, index) => index.toString()}
//     showsHorizontalScrollIndicator={false}
// />

// --------------------------- HOW TO USE ----------------------------- //

const InProgress = ({ item, hide_Model }) => {
    const navigation = useNavigation();
    const navToDetails = (item) => {
        navigation.navigate("Details", { Data: item });
    };
    return (
        <View className='mb-2 drop-shadow-2xl' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
            <TouchableOpacity activeOpacity={1} onPress={() => { hide_Model?.(), navToDetails(item) }}>
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
                            defaultSource={require('./../../assets/store.jpg')}
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
}

export const ListCard_Self1 = ({ item, hide_Model }) => {
    const navigation = useNavigation();
    const navToDetails = (item) => {
        navigation.navigate("Details", { Data: item });
    };
    return (
        <>
            {/* <View style={{ backgroundColor: Colors.dark.colors }}> */}
            <View className=' mt-5 rounded-2xl' style={styles.popularFeatureBodyContainer}>
                <View className=' flex-row h-full p-2 items-center'>
                    <Image
                        source={{
                            uri: item.image,
                            method: 'POST',
                            headers: {
                                Pragma: 'no-cache',
                            },
                        }}
                        defaultSource={require('./../../assets/store.jpg')}
                        className=' h-full w-7/12 rounded-xl'
                        style={{ borderWidth: 2, borderColor: Colors.dark.colors.backGroundColor }}
                        alt="Logo"
                    />
                    <View className='flex-1 px-2'>
                        <Text className='font-black text-base' style={{ color: Colors.dark.colors.textColor }}>{item.menutype}</Text>
                        <Text className='font-light text-xl -mt-1' numberOfLines={2} ellipsizeMode='tail' style={{ color: Colors.dark.colors.mainTextColor }}>{item.name}</Text>
                        <TouchableOpacity
                            onPress={() => { hide_Model?.(), navToDetails(item) }}
                            className='justify-center items-center rounded-md mt-2 px-3 py-1'
                            style={{
                                backgroundColor: Colors.dark.colors.diffrentColorOrange,
                                alignSelf: 'flex-start',
                            }}
                        >
                            <Text className='text-base font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>Buy now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export const ListCard_Self3 = ({ item, hide_Model }) => {
    const navigation = useNavigation();
    const navToDetails = (item) => {
        navigation.navigate("Details", { Data: item });
    };
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => { hide_Model?.(), navToDetails(item) }}>
            <View className='flex-row mb-2 drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
                <LinearGradient
                    start={{ x: 0.4, y: -0.1 }} end={{ x: 0.8, y: 0.9 }}
                    colors={['transparent', Colors.dark.colors.backGroundColor]}
                    className=' -ml-1 flex-1 flex-row px-3 py-2 items-center'
                >
                    <View className=' w-2/5 h-36 rounded-xl overflow-hidden'>
                        <ImageBackground
                            // source={require('./../Data/banner.jpg')}
                            source={{
                                uri: item.image,
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache',
                                },
                            }}
                            defaultSource={require('./../../assets/store.jpg')}
                            className=' w-full h-full mr-2'
                            alt="Logo"
                        >
                            <LinearGradient
                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.3, y: 1.1 }}
                                className='overflow-hidden h-full w-full'
                                colors={['transparent', Colors.dark.colors.backGroundColor]}
                            ></LinearGradient>
                        </ImageBackground>
                    </View>
                    <View className=' ml-2'>
                        <Text numberOfLines={1} ellipsizeMode='middle' className='font-black text-xl' style={{ color: Colors.dark.colors.diffrentColorOrange }}>
                            {item.name}
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
                    </View>

                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
}

export const ListCard_Self2 = ({ index, item = null, hide_Model, onPress, shopStatus = 'open' }) => {
    const fontstyles = TextStyles();
    const navigation = useNavigation();
    const navToDetails = (item) => {
        navigation.navigate("Details", { Data: item });
    };

    const uniqueKey = item === 'null' ? `null-${index}` : `${index}_${item.id}` || `item-${index}`;

    return (
        <Animated.View key={uniqueKey} entering={FadeInDown.delay(index * 100).springify().damping(12)}>
            <TouchableOpacity activeOpacity={1}
                onPress={() => {
                    hide_Model?.();
                    if (shopStatus !== 'closed') {
                        onPress ? onPress() : navToDetails(item);
                    }
                }}
            >
                {item == 'null' ?
                    <View className='flex-row mb-2 drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
                        <View style={{ flex: 1, height: Dimensions.get('window').height * 0.22 }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.textColor }]}>You don't have store?</Text>
                                <Text style={[fontstyles.entryUpper, { color: Colors.dark.colors.textColor }]}>Add Now!</Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View className='flex-row mb-2 drop-shadow-2xl overflow-hidden ' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>
                        {/* <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                                // hide_Model?.();
                                onPress ? onPress() : navToDetails(item);
                            }}
                        > */}
                        <View className='overflow-hidden' style={styles.foodItemContainer}>
                            <ImageBackground
                                source={{
                                    uri: item.image,
                                    method: 'POST',
                                    headers: {
                                        Pragma: 'no-cache',
                                    },
                                }}
                                defaultSource={require('./../../assets/store.jpg')}
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
                                </LinearGradient>
                                <View className='absolute top-2 left-2'>
                                    <View className='flex-row justify-center items-center'>
                                        <Text className=' uppercase' style={[fontstyles.number, { color: shopStatus != 'closed' ? '#00FF00' : 'red' }]}>{shopStatus}</Text>
                                    </View>
                                </View>
                                <View className='absolute bottom-2 right-2'>
                                    <View className='flex-row justify-center items-center'>
                                        {item.type === "PureVeg" && <Ionicons name="leaf" size={16} color={Colors.dark.colors.diffrentColorGreen} />}
                                        <Text className='ml-1' style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]}>{item.type}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                        {/* </TouchableOpacity> */}

                        <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.8, y: 1 }}
                            colors={['transparent', Colors.dark.colors.backGroundColor]}
                            className=' -ml-1 flex-1 justify-center '
                        >
                            <Text numberOfLines={1} ellipsizeMode='middle' style={[fontstyles.boldh2, { color: Colors.dark.colors.diffrentColorOrange }]}>
                                {/* {item.name} */}
                                {item.name}
                            </Text>
                            <View className='flex-row'>
                                <View className='rounded-xl justify-center items-center flex-row' style={{ height: Dimensions.get('window').height * 0.04 }}>
                                    {StarIcon()}
                                    <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}> {item.rating} ({item.ratingcount}+)</Text>
                                </View>
                            </View>
                            <View className='font-extralight text-sm flex-row items-center' >
                                {/* <Text style={{ color: Colors.dark.colors.textColor }} className='text-base '>{item.type}</Text> */}
                                {/* <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} /> */}
                                {/* <Text style={{ color: Colors.dark.colors.textColor }} className='text-base'>{item.menutype}</Text> */}
                                {/* {console.log('menuType', item.menuType)} */}
                                
                                {item.menuType.map((item, index) => (
                                    <View key={`menuType-${index}`} className=' flex-row items-center'>
                                        {/* {console.log(index)} */}
                                        {index == 0 ? null : <Ionicons name="ellipse" size={5} color={Colors.dark.colors.textColor} />}
                                        <Text style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]}> {item} </Text>
                                    </View>
                                ))}
                                {/* {item.menuType.map((menuItem, menuIndex) => (
                                    <View key={`menuType-${menuIndex}`} className='flex-row items-center'>
                                        {menuIndex !== 0 && <Ionicons name="ellipse" size={5} color={Colors.dark.colors.textColor} />}
                                        <Text style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]}> {menuItem} </Text>
                                    </View>
                                ))} */}
                            </View>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.7, y: 1.0 }}
                                colors={[Colors.dark.colors.backGroundColor, 'transparent']}
                                className=' w-44 mt-4 font-semibold text-sm flex-row items-center p-2 rounded-l-full flex'
                            >
                                {CarIcon()}
                                <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.number, { textTransform: 'uppercase', color: Colors.dark.colors.diffrentColorPerple }]}>  {item.location.split(',')[0]}</Text>
                            </LinearGradient>

                        </LinearGradient>
                    </View>
                }
            </TouchableOpacity>
        </Animated.View>
    );
}

export const ListCard_Menu_Self2 = ({ item, hide_Model }) => {
    const navigation = useNavigation();
    const navToDetails = (item) => {
        navigation.navigate("Details", { Data: item });
    };
    return (
        <>
            {/* {console.log(item.availability)} */}
            <FlatList
                showsVerticalScrollIndicator={false}
                keyboardDismissMode='on-drag'
                data={item.availability} //campusShops
                renderItem={({ item, index }) => <ListCard_Z index={index} item={item} navigationMenu={true} hide_Model={hide_Model} />}
                // renderItem={({ item }) => {console.log(item.location)}}
                keyExtractor={(item, index) => `${index}_${item.name}`}
            />
        </>
    );
}

export const ListCard_Z = ({ index, item, hide_Model, navigationMenu }) => {
    const navigation = useNavigation();
    const { outletsNEW } = useContext(GlobalStateContext);
    const navToDetails = (item) => {
        navigation.navigate("Details", { Data: item });
    };

    return (
        <Animated.View entering={FadeInDown.delay(100).springify().damping(12)}>
            <TouchableOpacity onPress={() => { hide_Model?.(), navToDetails(navigationMenu ? outletsNEW.find(shop => shop.name === item.name) : item) }} activeOpacity={1}>
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
                        defaultSource={require('./../../assets/store.jpg')}
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
        </Animated.View>
    );
}

export const ListCard_S = ({ item, hide_Model }) => {
    const navigation = useNavigation();
    const navToDetails = (item) => {
        navigation.navigate("Details", { Data: item });
    };

    return (
        // <Text>{item.type}</Text>
        <TouchableOpacity activeOpacity={1} onPress={() => { hide_Model?.(), navToDetails(item) }}>
            <View style={styles.renderItem2itemContainer}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.CardLinearGradientContainer}
                    // colors={[Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor, Colors.dark.colors.backGroundColor]}>
                    colors={[Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor]}
                >
                    <ImageBackground
                        source={{
                            uri: item.image,
                            method: 'POST',
                            headers: {
                                Pragma: 'no-cache',
                            },
                        }}
                        defaultSource={require('./../../assets/store.jpg')}
                        style={styles.CardImageBG}
                        resizeMode="cover">
                        <View style={styles.CardRatingContainer}>
                            {
                                item.type === "Veg" &&
                                <>
                                    <Text style={{ color: '#00e676' }} className='text-base font-semibold mr-1'>{item.type}</Text>
                                    <Ionicons name="leaf" size={18} color={'#00e676'} />
                                </>
                            }
                        </View>
                    </ImageBackground>
                    <View style={styles.CardBelowImageBG}>

                        <View className=' flex-row justify-between'>
                            <View className='w-8/12 mr-1'>
                                <Text className='font-black text-lg' numberOfLines={2} ellipsizeMode='middle' style={{ color: Colors.dark.colors.diffrentColorOrange }}>
                                    {item.name}
                                </Text>
                                <View className='font-extralight text-base flex-row items-center' >
                                    <Text style={{ color: Colors.dark.colors.textColor }} className='text-base' numberOfLines={1} ellipsizeMode='middle'>{item.menutype}</Text>
                                    <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                                </View>
                            </View>

                            <View className=' w-4/12 flex-row justify-center items-center bg-green-600 rounded-lg px-1 h-7'>
                                <Text className='text-base font-semibold mr-1 flex' style={{ color: Colors.dark.colors.mainTextColor }}>{item.rating}</Text>
                                <Ionicons size={10} name="star" color={Colors.dark.colors.mainTextColor} />
                            </View>
                        </View>

                        <Text numberOfLines={1} ellipsizeMode='clip' style={{ color: Colors.dark.colors.mainTextColor }}> - - - - - - - - - - - - - - - - - - - -</Text>
                        <View className='flex-row w-full items-center'>
                            {CarIcon()}
                            <Text style={{ color: Colors.dark.colors.diffrentColorPerple }} className=' font-black uppercase'> {item.location}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    popularFeatureBodyContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.03,  // should be applyed to all fixed items
        // marginTop: Dimensions.get('window').height * 0.04, // should be applyed to all fixed items
        height: Dimensions.get('window').height * 0.21,
        width: Dimensions.get('window').width * 0.94,
        backgroundColor: Colors.dark.colors.componentColor, // bg color
        borderWidth: 2,
        borderColor: Colors.dark.colors.secComponentColor,
    },
    CardLinearGradientContainer: {
        overflow: 'hidden',
        width: Dimensions.get('window').width * 0.44,
        flex: 1,
        // padding: 10,
        borderRadius: 25,
    },
    CardBelowImageBG: {
        margin: 10,
    },
    CardImageBG: {
        margin: 10,  // Remove if want full image
        borderRadius: 20, // Remove if want full image

        width: 'full',
        height: Dimensions.get('window').width * 0.38,
        marginBottom: 8,
        overflow: 'hidden',
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(5, 6, 8, 0.85)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingHorizontal: 12,
        position: 'absolute',
        borderBottomLeftRadius: 20,
        top: 0,
        right: 0,
    },
    CardRatingText: {
        // fontFamily: FONTFAMILY.poppins_medium,
        color: Colors.dark.colors.mainTextColor,
        lineHeight: 22,
        fontSize: 14,
    },
    CardTitle: {
        // fontFamily: FONTFAMILY.poppins_medium,
        color: Colors.dark.colors.mainTextColor,
        fontSize: 16,
    },
    CardSubtitle: {
        // fontFamily: FONTFAMILY.poppins_light,
        color: Colors.dark.colors.mainTextColor,
        fontSize: 10,
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    CardPriceCurrency: {
        // fontFamily: FONTFAMILY.poppins_semibold,
        color: Colors.dark.colors.diffrentColorOrange,
        fontSize: 18,
    },
    CardPrice: {
        color: Colors.dark.colors.mainTextColor,
    },


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
        backgroundColor: Colors.dark.colors.shadowcolor,
        elevation: 5,
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