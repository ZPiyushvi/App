import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FoodTypeIcon = ({ type, size, padding }) => {
  const iconConfig = {
    Hot: {
      label: 'Hot',
      iconName: 'flame',
      bgColor: 'bg-red-300',
      iconColor: 'red',
    },
    Beverage: {
      label: 'Beverage',
      iconName: 'wine',
      bgColor: 'bg-blue-300',
      iconColor: 'blue',
    },
    Stationery: {
      label: 'Stationery',
      iconName: 'library',
      bgColor: 'bg-blue-300',
      iconColor: 'blue',
    },
    Dessert: {
      label: 'Dessert',
      iconName: 'ice-cream',
      bgColor: 'bg-pink-400',
      iconColor: 'pink',
    },
    Fresh: {
      label: 'Fresh',
      iconName: 'nutrition',
      bgColor: 'bg-green-300',
      iconColor: 'green',
    },
    Cafe: {
      label: 'Cafe',
      iconName: 'cafe',
      bgColor: 'bg-yellow-400',
      iconColor: 'brown',
    },
    Cold: {
      label: 'Cold',
      iconName: 'snow',
      bgColor: 'bg-sky-100',
      iconColor: 'lightblue',
    },
    Snacks: {
      label: 'Snacks',
      iconName: 'fast-food',
      bgColor: 'bg-orange-200',
      iconColor: 'orange',
    },
    Pizza: {
      label: 'Pizza',
      iconName: 'pizza',
      bgColor: 'bg-orange-200',
      iconColor: 'orange',
    },
    Meal: {
      label: 'Meal',
      iconName: 'restaurant',
      bgColor: 'bg-orange-200',
      iconColor: 'orange',
    },
  };

  const { label, iconName, bgColor, iconColor } = iconConfig[type] || {};

  return (
    <View className={`mr-2 flex-row items-center ${bgColor}`} style={{ borderRadius: 4, paddingHorizontal: padding }}>
      <Text>{label} </Text>
      <Ionicons name={iconName} size={size} color={iconColor} />
    </View>
  );
};

export default FoodTypeIcon;