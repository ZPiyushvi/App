import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import foodTypes from '../Data/foodtype';

const Cart = () => {
  const colors = useTheme().colors;

  // Helper function to format data for 4x2 grid
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.foodTypeContainer, styles.invisible]} />;
    }
    return (
      <View style={styles.foodTypeContainer}>
        <Image source={item.iconName} style={styles.foodTypeImage} />
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={formatData(foodTypes, 4)}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={4}
      contentContainerStyle={styles.foodcontainer}
    />
  );
};

const styles = StyleSheet.create({
  foodcontainer: {
    justifyContent: 'center',
  },
  foodTypeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: Dimensions.get('window').width * 0.02,
  },
  foodTypeImage: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: 20,
  },
  invisible: {
    backgroundColor: 'transparent',
  },
});

export default Cart;
