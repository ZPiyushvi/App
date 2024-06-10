import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const PopularMenuContainor = ({ data }) => {
    return (
        <>
            <ScrollView horizontal>
                {data.map(item => (

                    <View>
                        <View style={styles.foodItemCollectionContainer}>
                            <TouchableOpacity>
                                <View className='h-28 w-24' style={styles.foodItemContainer}>
                                    <Text>{item.name}</Text>
                                </View>
                                <View>
                                    <Text>{item.name}</Text>
                                    <Text>item.price</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                ))}
            </ScrollView>
        </>
    )
}

const styles = {
    foodItemCollectionContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.03, // should be applyed to all fixed items
        marginTop: Dimensions.get('window').height * 0.02, // should be applyed to all fixed items
        // height: Dimensions.get('window').height * 0.40,
        gap: Dimensions.get('window').width * 0.04,
        // justifyContent: 'space-between', // can be also appled
    },
    foodItemContainer: {
        backgroundColor: "#114232", // bg color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },

    txt: {
        color: '#40A578'
    },
}

export default PopularMenuContainor