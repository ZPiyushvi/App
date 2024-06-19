import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Components/Colors';
import { mockCampusMenu } from "../Data/mockCampusMenu";

const SearchBox = () => {
  const [campusMenu, setCampusMenu] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);

  useEffect(() => {
    // Initialize campusMenu with mock data
    setCampusMenu(mockCampusMenu.map(item => item.name));

    // Animate the opacity of the placeholder text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Schedule text change at intervals
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % campusMenu.length;
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Update placeholder text after fade out animation completes
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000); // Change every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <View className='searchInputTxt rounded-xl w-[83%] text-base pl-3' style={{ backgroundColor: Colors.dark.colors.secComponentColor, justifyContent:'center', height: 50}}>
      <Ionicons
        color={Colors.dark.colors.diffrentColorOrange}
        name="search"
        size={24}
        style={styles.icon}
      />
      {!isFocused && value === '' && (
        <View style={styles.placeholderContainer}>
          <Text className=' text-lg font-medium' style={{color: Colors.dark.colors.textColor}}>Search </Text>
          <Animated.Text className=' text-lg font-medium' style={{ color: Colors.dark.colors.textColor, opacity: fadeAnim }}>
            "{campusMenu.length > 0 && campusMenu[1]}"
          </Animated.Text>
        </View>
      )}
      <TextInput
        style={[styles.textInput, { backgroundColor: Colors.dark.colors.secComponentColor }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '83%',
    height: 60,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 60, // Padding to make space for the icon
    fontSize: 16,
    borderRadius: 15,
  },
  icon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  placeholderContainer: {
    position: 'absolute',
    left: 50,
    flexDirection: 'row',
    zIndex: 1,
  },
  placeholderText: {
    // fontSize: 18,
    // color: 'grey',
  },
  animatedText: {
    // fontSize: 18,
    // color: 'grey',
  },
});

export default SearchBox;
