import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '../Components/Colors';
import Outlets from '../Data/Outlets';

const Home = () => {
  const colors = useTheme().colors;

  const renderMenuItem = ({ item }) => (
    <View style={styles(colors).menuItem}>
      <Text style={styles(colors).menuItemText}>{item.item}</Text>
      <Text style={styles(colors).menuItemPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );
  
  const renderOutlet = ({ item }) => (
    <View style={styles(colors).outletContainer}>
      <Text style={styles(colors).outletName}>{item.name}</Text>
      <Text style={styles(colors).outletDescription}>{item.description}</Text>
      <Text style={styles(colors).outletHours}>Hours: {item.hours}</Text>
      <Text style={styles(colors).menuTitle}>Menu:</Text>
      <FlatList
        data={item.menu}
        renderItem={renderMenuItem}
        keyExtractor={(menuItem) => menuItem.item}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={styles(colors).container}>
      <FlatList
        data={Outlets}
        renderItem={renderOutlet}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.dark.colors.backGroundColor,
    },
    outletContainer: {
      backgroundColor: colors.card,
      padding: 10,
      marginVertical: 5,
      width: '90%',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    outletName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    outletDescription: {
      fontSize: 14,
      color: colors.text,
    },
    outletHours: {
      fontSize: 12,
      color: colors.text,
      marginTop: 5,
    },
  });

export default Home;
