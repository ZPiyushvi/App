import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

const Cart = ({ route }) => {
  const { storeName, items } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Item: {item.item}</Text>
      <Text style={styles.itemText}>Price: ₹{item.price}</Text>
      <Text style={styles.itemText}>Description: {item.description}</Text>
      <Text style={styles.itemText}>Category: {item.category}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemText}>Rating: {item.rating} ({item.ratingcount} reviews)</Text>
      <Text style={styles.itemText}>Long Description: {item.longdescription}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  storeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Cart;
