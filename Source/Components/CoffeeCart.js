import React from 'react';
import {
    Dimensions,
    ImageBackground,
    ImageProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
// import BGIcon from './BGIcon';
import Colors from './Colors';
import TruncatedTextComponent from './TruncatedTextComponent';
import Icons from './Icons';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const CoffeeCard = ({ data }) => {
    const { StarIcon, CarIcon } = Icons();
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            // colors={[Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor, Colors.dark.colors.backGroundColor]}>
            colors={[Colors.dark.colors.secComponentColor, Colors.dark.colors.componentColor]}
        >
            <ImageBackground
                source={{
                    uri: data.image,
                    method: 'POST',
                    headers: {
                        Pragma: 'no-cache',
                    },
                }}
                style={styles.CardImageBG}
                resizeMode="cover">
                <View style={styles.CardRatingContainer}>
                    {/* <Ionicons
                        name="star"
                        color={Colors.dark.colors.diffrentColorOrange}
                        size={16}
                    />
                    <Text style={styles.CardRatingText}>{data.rating}</Text> */}
                    {
                        data.type === "Veg" &&
                        <>
                            <Text style={{ color: '#00e676' }} className='text-base font-semibold mr-1'>{data.type}</Text>
                            <Ionicons name="leaf" size={18} color={'#00e676'} />
                        </>
                    }
                </View>
            </ImageBackground>
            <View style={styles.CardBelowImageBG}>

                <View className=' flex-row justify-between'>
                    <View className='w-8/12 mr-1'>
                        <Text className='font-black text-lg' style={{ color: Colors.dark.colors.diffrentColorOrange }}>
                            {TruncatedTextComponent(data.name, 16)}
                        </Text>
                        <View className='font-extralight text-base flex-row items-center' >
                            <Text style={{ color: Colors.dark.colors.textColor }} className='text-base '>{data.type}</Text>
                            <Ionicons style={{ marginTop: 4, paddingHorizontal: 4 }} name="ellipse" size={5} color={Colors.dark.colors.textColor} />
                            <Text style={{ color: Colors.dark.colors.textColor }} className='text-base'>{data.menutype}</Text>
                        </View>
                    </View>

                    <View className=' w-4/12 flex-row justify-center items-center bg-green-600 rounded-lg px-1 h-7'>
                        <Text className='text-base font-semibold mr-1 flex' style={{ color: Colors.dark.colors.mainTextColor }}>{data.rating}</Text>
                        <Ionicons size={10} name="star" color={Colors.dark.colors.mainTextColor} />
                    </View>
                </View>

                <Text style={{ color: Colors.dark.colors.mainTextColor }}> - - - - - - - - - - - - - - - - - - - -</Text>
                <View className='flex-row w-full items-center'>
                    {CarIcon()}
                    <Text style={{ color: Colors.dark.colors.diffrentColorPerple }} className=' font-black uppercase'> {TruncatedTextComponent(data.locationdetailed, 13)}</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
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
});

export default CoffeeCard;