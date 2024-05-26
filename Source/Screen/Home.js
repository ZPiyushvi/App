import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Components/Colors';
// import {useUser} from "@clerk/clerk-expo"
const Home = () => {
  const colors = useTheme().colors;

  return (
    <View style={styles(colors).container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.dark.colors.backGroundColor,
    },
  });

export default Home;