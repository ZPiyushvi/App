import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cart = () => {
  const colors = useTheme().colors;

  return (
    <View style={styles(colors).container}>
      <Text>Cart</Text>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Cart;