import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from './Colors';
import TruncatedTextComponent from './TruncatedTextComponent';

const PopularMenuContainer = ({ data }) => {
    const navigation = useNavigation();

    const navToDetails = (item) => {
        navigation.navigate("Details", { data: item });
    };

    const renderItem = ({ item }) => (
        <View style={styles.foodItemCollectionContainer}>
            {/* onPress={() => navToDetails(item)} */}
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
                        // source={item.image}
                        className=' h-full w-full overflow-hidden'
                        alt="Logo"
                        resizeMode='cover'
                        style={{ flex: 1, justifyContent: 'center', }}
                    >
                        <LinearGradient className='overflow-hidden h-full w-full' colors={['transparent', Colors.dark.colors.backGroundColor]}>
                            <View className='absolute bottom-1 p-2'>
                                <Text numberOfLines={1} ellipsizeMode='tail' className='font-extrabold text-xl -mb-1' style={{ color: Colors.dark.colors.mainTextColor }}>
                                    {item.name}
                                </Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' className='font-semibold text-sm' style={{ color: Colors.dark.colors.textColor }}>
                                    {item.name}
                                </Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            horizontal
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    foodItemCollectionContainer: {
        marginLeft: Dimensions.get('window').width * 0.035,
        marginTop: Dimensions.get('window').height * 0.02,
        gap: Dimensions.get('window').width * 0.02,
    },
    foodItemContainer: {
        backgroundColor: Colors.dark.colors.textColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: Dimensions.get('window').height * 0.20,
        width: Dimensions.get('window').height * 0.14,
    },
    txt: {
        color: '#40A578',
    },
});

export default PopularMenuContainer;
