import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Colors from './Colors'
import TruncatedTextComponent from './TruncatedTextComponent'
import FoodIcon from './FoodIcon'

const SlideItems = ({ item }) => {

    return (
        <View className=' p-2 mt-5' style={styles.popularFeatureBodyContainer}>
            <View style={styles.popularFeatureSplitContainer}>
                <Image
                    source={{
                        uri: item.image,
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache',
                        },
                    }}
                    style={styles.popularFeatureImage}
                    alt="Logo"
                />
                <View style={styles.popularFeaturesContent}>
                    <Text className='font-extrabold text-lg' style={{ color: Colors.dark.colors.textColor }}>{item.menutype}</Text>
                    <Text className='font-normal text-xl -mt-1' style={{ color: Colors.dark.colors.mainTextColor }}>{TruncatedTextComponent(item.name, 12)}</Text>
                    <TouchableOpacity
                        className='justify-center items-center rounded-md mt-2 px-3 py-1'
                        style={{
                            backgroundColor: Colors.dark.colors.diffrentColorOrange,
                            alignSelf: 'flex-start',
                        }}
                    >
                        <Text className='text-base font-bold' style={{color:Colors.dark.colors.mainTextColor}}>Buy now</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default SlideItems

const styles = StyleSheet.create({
    popularFeatureBodyContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.03,  // should be applyed to all fixed items
        // marginTop: Dimensions.get('window').height * 0.04, // should be applyed to all fixed items
        height: Dimensions.get('window').height * 0.170,
        width: Dimensions.get('window').width * 0.94,
        // padding: 12,
        backgroundColor: Colors.dark.colors.secComponentColor, // bg color
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    popularFeatureSplitContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    popularFeatureImage: {
        // resizeMode: 'contain',
        height: '100%',
        width: '57%', // Adjust width for responsiveness
        borderWidth: 2,
        borderColor: Colors.dark.colors.componentColor, // border color
        borderRadius: 14,
    },
    popularFeaturesContent: {
        flex: 1,
        padding: 7,
    },
    NormalTxt: {
        color: "#FCDC2A",
        fontWeight: '900',
        fontSize: 18,
    },
    BoldTxt: {
        fontWeight: '400',
        marginBottom: 8,
        fontSize: 21,
        color: "#F7F6BB",
    },
    text: {
        margin: 24,
        fontSize: 60,
    },
})