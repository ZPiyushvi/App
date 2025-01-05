import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Components/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import FoodIcon from '../Components/FoodIcon';
import FoodTypeIcon from '../Components/FoodTypeIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShimmerPlaceholder = createShimmerPlaceHolder(LinearGradient)

const content = [
    { "name": "Calories", "size": "-----" },
    { "name": "Protein", "size": "-----" },
    { "name": "Carbohydrates", "size": "-----" },
    { "name": "Fats", "size": "-----" },
    { "name": "Sodium", "size": "-----" },
    { "name": "Fiber", "size": "-----" },
    { "name": "Sugar", "size": "-----" }
    // { "name": "Calories", "size": "450 grams(g)" },
    // { "name": "Protein", "size": "30 grams(g)" },
    // { "name": "Carbohydrates", "size": "40 grams(g)" },
    // { "name": "Fats", "size": "18 grams(g)" },
    // { "name": "Sodium", "size": "950 milligrams(mg)" },
    // { "name": "Fiber", "size": "3 grams(g)" },
    // { "name": "Sugar", "size": "2 grams(g)" }
];

export default DetailView = ({ route }) => {
    const { Data } = route.params;
    const [data, setData] = useState(null);
    const [liked, setLiked] = useState(false); // Default as false, will set this correctly in useEffect
    const shimmerColors = [Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor, Colors.dark.colors.secComponentColor];
    const shimmerColors2 = [Colors.dark.colors.componentColor, Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor];

    const handleLike = async () => {
        setLiked(prevLiked => !prevLiked); // Toggle the liked state

        // Get existing liked items from AsyncStorage
        const likedItems = JSON.parse(await AsyncStorage.getItem('likedItems')) || [];

        if (!liked) {
            // If not liked, add the current item
            likedItems.push(data);
            await AsyncStorage.setItem('likedItems', JSON.stringify(likedItems));
            console.log("Item liked and saved!");
        } else {
            // If already liked, remove the current item
            const updatedLikedItems = likedItems.filter(item => item._id !== data._id);
            await AsyncStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
            console.log("Item unliked and removed.");
        }
    };

    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);  // Set the selected rating value
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => handleRatingChange(i)}>
                    <Ionicons
                        name={i <= rating ? 'star' : 'star-outline'}
                        size={30}
                        color={i <= rating ? 'gold' : 'gray'}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    useEffect(() => {
        // Show shimmer initially
        setVisible(false);

        // Check if item is already liked when the component loads
        const checkLikedStatus = async () => {
            const likedItems = JSON.parse(await AsyncStorage.getItem('likedItems')) || [];
            const isLiked = likedItems.some(item => item._id === Data._id); // Check if current item is in likedItems
            setLiked(isLiked); // Set liked state based on check
        };
        checkLikedStatus(); // Call the function to check liked status

        // Simulate data fetch
        setTimeout(() => {
            setData(Data); // Replace with actual data fetch
            setVisible(true);
        }, 200); // Adjust timing as necessary
    }, [Data]);

    const [visible, setVisible] = React.useState(false);

    return (
        <View key={`${data?.item}`} className=' w-full h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
            {!visible && <>
                <View className=' w-full h-full'>
                    <View className='h-96 w-full'>
                        <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className=' h-full w-full mr-2 mt-5 mb-3 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, borderBottomRightRadius: 100 }} />
                        <View className=' absolute flex-row mx-4 -bottom-14 z-50 '>
                            <ShimmerPlaceholder shimmerColors={shimmerColors2} visible={visible} className='mr-2 mt-5 mb-3 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.060, width: Dimensions.get('window').height * 0.13 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors2} visible={visible} className='mr-2 mt-5 mb-3 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.060, width: Dimensions.get('window').height * 0.060 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors2} visible={visible} className='mr-1 mt-5 mb-3 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.060, width: Dimensions.get('window').height * 0.060 }} />
                            <ShimmerPlaceholder shimmerColors={shimmerColors2} visible={visible} className='mr-2 mt-5 mb-3 rounded-md overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.060, width: Dimensions.get('window').height * 0.060 }} />
                        </View>
                    </View>

                    <ShimmerPlaceholder shimmerColors={shimmerColors} visible={visible} className='mt-14 mb-3 w-full overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.20 }} />
                    <Text numberOfLines={1} ellipsizeMode='clip' style={{ color: Colors.dark.colors.textColor }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                    <Text numberOfLines={6} ellipsizeMode='tail' className='font-semibold text-base p-3 text-center' style={{ color: Colors.dark.colors.textColor }}>
                        Please note that all nutritional information provided is estimated and may vary based on portion size, preparation methods, and ingredient sourcing. The content and descriptions are set by the restaurant and may contain allergens or other dietary considerations. {`\n`}For specific dietary needs or concerns, please consult with the restaurant staff directly.
                    </Text>
                </View>
            </>}

            <View className=' absolute top-0 right-0 h-16 w-16 items-center justify-center z-50 rounded-bl-[50%] bg-black'>
                <TouchableOpacity onPress={handleLike}>
                    <Ionicons name={liked ? "heart" : "heart-outline"} size={34} color={liked ? 'red' : Colors.dark.colors.textColor} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View className=' h-96' style={{ borderBottomRightRadius: 100, backgroundColor: Colors.dark.colors.secComponentColor }} >
                    <ImageBackground
                        source={{
                            uri: data?.image,
                            method: 'POST',
                            headers: {
                                Pragma: 'no-cache',
                            },
                        }}
                        defaultSource={require('./../../assets/menu.jpg')}
                        alt="Logo"
                        className='h-full overflow-hidden'
                        style={{ borderBottomRightRadius: 100 }}
                    >
                        <LinearGradient
                            start={{ x: 0.3, y: 0.4 }} end={{ x: 0.1, y: 1 }}
                            className='overflow-hidden h-full w-full'
                            colors={['transparent', Colors.dark.colors.backGroundColor]}
                        ></LinearGradient>
                    </ImageBackground>

                    <View className='w-full absolute bottom-0 p-4'>
                        <View className=' flex-row w-full'>
                            <View>
                                <Text className=' font-black text-4xl' style={{ color: Colors.dark.colors.mainTextColor }}>
                                    {data?.item}
                                </Text>
                                <View className='py-4'>
                                    {/* <LongStarIcon rating={data?.rating} ratingcount={data?.ratingcount} gaps={20} border={0} size={20} backGround={'transparent'} /> */}
                                </View>
                            </View>
                        </View>
                        <View className='absolute mx-4 -bottom-6 flex-row'>
                            <Text className=' font-black text-xl py-2 px-4 rounded-md mr-2' style={{ color: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.diffrentColorOrange }}>
                                Rs. {data?.price}
                            </Text>
                            <View className='flex-row'>
                                {
                                    data?.type &&
                                    <FoodIcon key={`${data?.type}`} style={{ backgroundColor: 'black' }} type={data?.type} size={22} padding={7} />
                                }
                                {
                                    data?.category.split('_').map((part, index) => (
                                        <FoodTypeIcon key={`${index}_${part}`} type={part} size={25} padding={7} textShow={false} />
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </View>

                <View className='mt-9'>
                    <View className=' p-4 py-7 mb-2' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                        <Text className=' font-black text-xl mb-2' style={{ color: Colors.dark.colors.mainTextColor, }}>
                            Know Your Dish
                        </Text>
                        <Text className=' font-normal text-base' style={{ color: Colors.dark.colors.textColor, }}>
                            {data?.description}
                        </Text>
                    </View>

                    <View className=' p-4 py-7 mb-2' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                        <Text className=' font-black text-xl mb-2' style={{ color: Colors.dark.colors.mainTextColor }}>
                            Nutrition Facts
                        </Text>
                        {content.map((item, index) => (
                            <View key={`${index}_${item.name}`}>
                                <View className=' flex-row justify-between mt-3'>
                                    <Text className=' font-bold text-base' style={{ color: Colors.dark.colors.mainTextColor }}>{item.name}</Text>
                                    <Text className=' font-normal text-base' style={{ color: Colors.dark.colors.textColor }}>{item.size}</Text>
                                </View>
                                <Text numberOfLines={1} ellipsizeMode='clip' style={{ color: Colors.dark.colors.textColor }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                            </View>
                        ))}
                    </View>

                    <View className=' p-4 py-7 mb-2' style={{ backgroundColor: Colors.dark.colors.componentColor }}>

                        <Text className='font-black text-xl mb-2' style={{ color: Colors.dark.colors.mainTextColor }}>
                            Rate This Dish
                        </Text>
                        <View className="flex-row">
                            {renderStars(rating)}
                        </View>

                        <View className="mt-4">
                            <Text className='text-base' style={{ color: Colors.dark.colors.textColor }}>
                                <Text className="font-bold" style={{ color: Colors.dark.colors.mainTextColor }}>
                                    Current Rating: {data?.rating || "N/A"} stars
                                </Text>
                                {" "}({data?.ratingcount} ratings)
                            </Text>
                        </View>
                    </View>
                </View>

                <View className=' p-4 py-7 mt-2' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                    <Text className=' font-black text-xl mb-2' style={{ color: Colors.dark.colors.mainTextColor, }}>
                        Disclaimer
                    </Text>
                    <Text className=' font-normal text-base' style={{ color: Colors.dark.colors.textColor, }}>
                        Please note that all nutritional information provided is estimated and may vary based on portion size, preparation methods, and ingredient sourcing. The content and descriptions are set by the restaurant and may contain allergens or other dietary considerations. {`\n`}For specific dietary needs or concerns, please consult with the restaurant staff directly.
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}