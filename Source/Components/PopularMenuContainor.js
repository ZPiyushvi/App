import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PopularMenuContainer = ({ data }) => {
    const navigation = useNavigation();

    const navToDetails = (item) => {
        navigation.navigate("Details", { data: item });
    };

    const renderItem = ({ item }) => (
        <View style={styles.foodItemCollectionContainer}>
            {/* onPress={() => navToDetails(item)} */}
            <TouchableOpacity>
                <View style={styles.foodItemContainer}>
                    <Text>{item.name}</Text>
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
        marginHorizontal: Dimensions.get('window').width * 0.03,
        marginTop: Dimensions.get('window').height * 0.02,
        gap: Dimensions.get('window').width * 0.04,
    },
    foodItemContainer: {
        backgroundColor: "#114232",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: Dimensions.get('window').height * 0.20,
        width: Dimensions.get('window').width * 0.30,
    },
    txt: {
        color: '#40A578',
    },
});

export default PopularMenuContainer;
