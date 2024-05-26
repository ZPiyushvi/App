import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Components/Colors';

const Likes = () => {
  const colors = useTheme().colors;

  return (
    <View style={styles(colors).container}>
      <Text>Likes</Text>
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

export default Likes;