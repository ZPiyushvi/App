import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
// import { Card, ListItem, Button, Icon } from 'react-native-elements';

const StoreItem = ({ item }) => (
  <View>
    <Text>{item.item}</Text>
    {/* <Card.Image source={{ uri: item.image }} /> */}
    <Text style={{ marginBottom: 10 }}>{item.longdescription}</Text>
    <Text>Category: {item.category}</Text>
    <Text>Price: ₹{item.price}</Text>
    <Text>Quantity: {item.quantity}</Text>
    <Text>Rating: {item.rating} ({item.ratingcount} reviews)</Text>
  </View>
);

const Store = ({ storeName, items }) => (
  <View>
    <Text style={styles.storeTitle}>{storeName}</Text>
    <FlatList
      data={items}
      renderItem={({ item }) => <StoreItem item={item} />}
      keyExtractor={item => item.id}
    />
  </View>
);

const Cart = () => {
  const { CartItems, setCartItems, setQuantity, quantity, updateQuantity } = useContext(GlobalStateContext);

  return (
    <View style={styles.container}>
      {console.log(CartItems)}
      {Object.entries(CartItems).map(([storeName, items]) => (
        <Store key={storeName} storeName={storeName} items={items} />
      ))}
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
});

export default Cart;