import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Components/Colors';

const Likes = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder='Search' style={styles.searchInputTxt}></TextInput>
        <Ionicons name="search" size={24} style={styles.searchIcon} />
      </View>
      <View style={styles.popularFeatures}>
        <View style={styles.popularFeaturesContainer}>
          <Image source={require("./../../assets/login2.jpg")} style={styles.popularFeaturesImage} alt="Logo" />
          <View style={styles.popularFeaturesContent}>
            <Text>Popular</Text>
            <Text style={styles.Txt}>Product_Name</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTxt}>Buy now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get('window').width * 0.1, // Responsive padding
    backgroundColor: Colors.dark.colors.backGroundColor,
  },
  searchContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically
  },
  searchInputTxt: {
    width: '73%',
    fontSize: 14,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.dark.colors.primaryColor_Background2,
  },
  searchIcon: {
    width: '20%',
    padding: 14,
    textAlign: 'center',
    borderRadius: 14,
    backgroundColor: Colors.dark.colors.primaryColor_Background2,
  },
  popularFeatures: {
    padding: 12,
    marginVertical: 20,
    height: 150, // Ensure minHeight for better visibility
    backgroundColor: Colors.dark.colors.primaryColor_Background2,
    borderRadius: 16,
  },
  popularFeaturesImage: {
    borderRadius: 14,
    height: '100%',
    width: '60%', // Adjust width for responsiveness
  },
  popularFeaturesContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
  },
  popularFeaturesContent: {
    padding: 7,
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '70%',
    backgroundColor: Colors.dark.colors.primaryColor_Background5,
  },
  buttonTxt: {
    textAlign: 'center',
  },
  Txt: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Likes;
