import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const Profile = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.main}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true} // Enable vertical scroll indicator
      >
        <View style={styles.content}>
          <Text>Hello</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#29272D" // Default background color
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white', // Static background color
  },
  content: {
    minHeight: Dimensions.get('window').height * 3, // Ensure content exceeds container height for scrolling
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
