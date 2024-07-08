import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "../Components/Colors";

const categoryData = [
  { 'type': 'Veg', 'color': '#00e676' },             
  { 'type': 'NonVeg', 'color': '#ff0000' },          
  { 'type': 'Stationery', 'color': 'blue' },     
  { 'type': 'Beverage', 'color': '#4ABFF4' },        
  { 'type': 'Hot_Cafe', 'color': '#923c01' },       
  { 'type': 'Cold_Cafe', 'color': '#c37960' },       
  { 'type': 'Snacks', 'color': '#ff611d' },        
  { 'type': 'Hot_Meal', 'color': '#ffb80e' },   
  { 'type': 'Cold_Dessert', 'color': '#FF4191' },  
  { 'type': 'Cold_Beverage', 'color': '#4ABFF4' },  
  { 'type': 'Fresh', 'color': 'green' },         
  { 'type': 'Hot_Snacks', 'color': '#ff611d' },    
  { 'type': 'Bakery_Dessert', 'color': '#FF4191' },  
  { 'type': 'Bakery_Bread', 'color': '#efa14b' },   
];

const Like = () => {
  return (
    <View className='h-full' style={styles.container}>
      {categoryData.map((category, index) => (
        <View key={index} style={[styles.categoryBox, { backgroundColor: category.color }]}>
          <Text style={styles.categoryText}>{category.type}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.colors.backGroundColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  categoryBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff', // White text color
  },
});

export default Like;
