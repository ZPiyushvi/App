import React, { useContext, useRef } from 'react';
import { View, ScrollView, Image, Animated, Text } from 'react-native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
const BANNER_H = 350;

const HomeScreen = () => {
  const { CartItems, setCartItems, setQuantity, quantity} = useContext(GlobalStateContext);
  return (
    <View>
      {CartItems.map((item, index) => (
        <View>
            <Text className=' text-3xl font-extrabold' key={index}>
              {item.amount}
              {item.data.item}
              {}
            </Text>
        </View>
      ))}

    </View>
  );
};

const styles = {
  text: {
    margin: 24,
    fontSize: 16,
  },
};

export default HomeScreen;