import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

const SlideItems = ({ item }) => {

    return (
        <View style={styles.popularFeatureBodyContainer}>
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

                    <Text style={styles.NormalTxt}>{item.menutype}</Text>
                    <Text style={styles.BoldTxt}>{item.name}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonTxt}>Buy now</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
        // <View style={styles.popularFeatureBodyContainer} className="popularFeatureBodyContainer bg-[#40A578] mt-7 rounded-t-2xl p-4">
        //     <View className='popularFeatureSplitContainer flex-row justify-center align-middle'>

        //         <Image source={images[item.image]} style={styles.popularFeatureImage} alt="Feature" />

        //         <View className='popularFeaturesContent p-5'>
        //             <Text className='NormalTxt text-[#FCDC2A] text-base font-bold'>{item.menutype}</Text>
        //             <Text className='BoldTxt text-[#F7F6BB] text-lg font-normal'>{item.name}</Text>
        //             <TouchableOpacity className='button bg-[#114232] justify-center align-middle p-3'>
        //                 <Text style={styles.buttonTxt}>Buy now</Text>
        //             </TouchableOpacity>
        //         </View>

        //     </View>
        // </View>
    )
}

export default SlideItems

const styles = StyleSheet.create({
    popularFeatureBodyContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.03,  // should be applyed to all fixed items
        marginTop: Dimensions.get('window').height * 0.04, // should be applyed to all fixed items
        height: Dimensions.get('window').height * 0.20,
        width: Dimensions.get('window').width * 0.94,
        padding: 12,
        backgroundColor: "#40A578", // bg color
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
        borderColor: '#114232', // border color
        borderRadius: 14,
    },
    popularFeaturesContent: {
        flex: 1,
        padding: 7,
    },

    button: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: '35%',
        paddingVertical: 8, // Adjust padding instead of fixed height
        // paddingHorizontal: 10, // Add padding for horizontal space
        backgroundColor: '#114232',
    },
    buttonTxt: {
        color: '#F7F6BB',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
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