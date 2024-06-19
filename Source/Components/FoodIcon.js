import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FoodIcon = ({ type, size, padding }) => {
  const iconConfig = {
    Veg: {
      iconName: 'ellipse',
      borderColor: 'green',
      iconColor: 'green',
      bgColor: 'bg-green-300',
    },
    NonVeg: {
      iconName: 'triangle',
      borderColor: 'red',
      iconColor: 'red',
      bgColor: 'bg-red-300',
    },
  };

  const { iconName, borderColor, iconColor, bgColor } = iconConfig[type] || {};

  return (
    <View className={`mr-2 ${bgColor}`} style={{ borderColor, borderWidth: 2, padding, borderRadius: 4 }}>
      <Ionicons name={iconName} size={size} color={iconColor} />
    </View>
  );
};

export default FoodIcon;
