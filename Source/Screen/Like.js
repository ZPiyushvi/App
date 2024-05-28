import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Components/Colors';
import { images } from '../Data/images';

const Likes = () => {
  const { colors } = useTheme();
  const [features, setFeatures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('https://c0cb8f55-d104-4407-82ae-17ae6ceeabc6.mock.pstmn.io/users/products/123');
      if (!response.ok) {
        console.log('Network response was not ok');
      }
      const data = await response.json();
      setFeatures(data);
      if (!data) {
        console.log('Failed to parse response as JSON');
      }
    } catch (error) {
      console.error("Error loading features:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.popularFeatures]}>
      <View style={styles.popularFeaturesContainer}>
        <Image source={images[item.image]} style={styles.popularFeaturesImage} alt="Feature" />
        <View style={styles.popularFeaturesContent}>
          <Text style={styles.NormalTxt}>{item.normalText}</Text>
          <Text style={styles.BoldTxt}>{item.boldText}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxt}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View style={styles.main}>
      <View style={styles.subContainer} />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput placeholder='Search' style={styles.searchInputTxt}></TextInput>
          <Ionicons name="search" size={24} style={styles.searchIcon} />
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            ref={flatListRef}
            data={features}
            horizontal
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            snapToInterval={(Dimensions.get('window').width * 0.9) + (Dimensions.get('window').width * 0.1)} // Width of item + margin
            decelerationRate="normal" // Adjust the snapping speed
            pagingEnabled
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </View>
        <View style={styles.scrollViwerContainer}>
          {features.map((_, index) => (
            <View
              key={index}
              style={[
                styles.scrollViwerIdentifier,
                currentIndex === index && styles.scrollViwerIdentifierActive
              ]}
            />
          ))}
        </View>
      </View>
      <View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#29272D"
  },
  container: {
    flex: 1,
    // padding: Dimensions.get('window').width * 0.1, // Responsive padding
    position: 'absolute',
  },
  subContainer: {
    backgroundColor: "#4A4356",
    height: "35%",
    width: "100%",
    // bottom: 0,
    // position: 'relative',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    padding: Dimensions.get('window').width * 0.1,
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
  flatListContainer: {
    height: 145, // Set a fixed height for the FlatList container
  },
  popularFeatures: {
    marginHorizontal: Dimensions.get('window').width * 0.1,
    // marginRight: 25,
    width: Dimensions.get('window').width * 0.8,
    padding: 12,
    marginVertical: 20,
    height: 135, // Ensure minHeight for better visibility
    backgroundColor: "#29272D",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  popularFeaturesImage: {
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'black',
    height: '100%',
    width: '58%', // Adjust width for responsiveness
  },
  popularFeaturesContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    height: '100%'
  },
  popularFeaturesContent: {
    padding: 7,
  },
  scrollViwerContainer: {
    padding: 15,
    gap: 3,
    flexDirection: 'row',
    marginTop: 0,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
    // height: 30,
    justifyContent: 'center',
    backgroundColor: "#29272D",
  },
  scrollViwerIdentifier: {
    borderRadius: 99,
    height: 6,
    width: 6,
    backgroundColor: Colors.dark.colors.primaryColor_Background1,
  },
  scrollViwerIdentifierActive: {
    backgroundColor: Colors.dark.colors.primaryColor_Background10, // Change color for active indicator
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
    fontSize: 14,
    fontWeight: '500',
  },
  NormalTxt: {
    fontWeight: '500',
    fontSize: 14,
  },
  BoldTxt: {
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 16,
  },
});

export default Likes;
