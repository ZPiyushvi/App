import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import FoodIcon from '../Components/FoodIcon';
import Colors from '../Components/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';

const Cart = ({ route }) => {
  const { storeName, items } = route.params;

  const renderItem = ({ item }) => (
    <View className=''>
      {
        item.type &&
        <FoodIcon style={{ backgroundColor: 'black' }} type={item.type} size={11} padding={2} />
      }

      <View className='flex-row mb-2 drop-shadow-2xl overflow-hidden' style={[styles.foodItemCollectionContainer, styles.shadowProp]}>

        <Text style={styles.itemText}>{item.item}</Text>
        <Text style={styles.itemText}>Price: ₹{item.price}</Text>

      </View>
    </View>
  );


  return (
    <View className=' h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
      <Text style={styles.storeTitle}>{storeName}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  foodItemCollectionContainer: {
    marginHorizontal: Dimensions.get('window').width * 0.07,
    marginTop: Dimensions.get('window').height * 0.02,
    gap: Dimensions.get('window').width * 0.04,
    // backgroundColor: 'white',
    borderRadius: 18,
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
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#fff',
  },
  storeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Cart;
