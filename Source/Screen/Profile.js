import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Components/Colors';
import { images } from '../Data/images';
import foodTypes from '../Data/foodtype';
import { mockcampus_home_popular } from '../Data/mockcampus_home_popular';


const Likes = () => {
  const { colors } = useTheme();
  const [features, setFeatures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    setFeatures(mockcampus_home_popular)
    // try {
    //   const response = await fetch('https://fdbb94ad-4fe0-4083-8c28-aaf22b8d5dad.mock.pstmn.io/mockcampus/home/popular');
    //   if (!response.ok) {
    //     console.log('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   console.log(data)
    //   setFeatures(data);
    //   if (!data) {
    //     console.log('Failed to parse response as JSON');
    //   }
    // } catch (error) {
    //   console.error("Error loading features:", error);
    // }
  };

  const makeFourCrossTwoMatrix = () => {
    const matrix = [];
    for (let row = 1; row <= 2; row++) {
      for (let col = 1; col <= 4; col++) {
        if (col === 1 || col === 3) {
          matrix.push(
            <View key={`${row}-${col}`} style={styles.foodTypeContainer}>
              <Text>{item.name}</Text>
            </View>
          );
        } else {
          matrix.push(
            <View key={`${row}-${col}`} style={styles.foodTypeContainer}>
              <Text>responsiveness</Text>
            </View>
          );
        }
      }
    }
    return matrix;
  };

  const renderImages = ({ item }) => (
    <View style={styles.scrollView}>
      <View style={styles.foodContainer}>
        <TouchableOpacity style={styles.foodTypeContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.foodTypeContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.foodContainer}>
        <TouchableOpacity style={styles.foodTypeContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.foodTypeContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.foodContainer}>
        <TouchableOpacity style={styles.foodTypeContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.foodTypeContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.foodContainer}>
        <TouchableOpacity style={styles.foodTypeContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.foodTypeContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={[styles.popularFeatures]}>
      <View style={styles.popularFeaturesContainer}>
        <Image source={images[item.image]} style={styles.popularFeaturesImage} alt="Feature" />
        <View style={styles.popularFeaturesContent}>
          <Text style={styles.NormalTxt}>{item.menutype}</Text>
          <Text style={styles.BoldTxt}>{item.name}</Text>
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
        <View style={styles.searchContainerMain}>
          <View style={styles.searchContainer}>
            <TextInput placeholder='Search' style={styles.searchInputTxt}></TextInput>
            <Ionicons name="search" size={24} style={styles.searchIcon} />
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.flatListContainer}>
          <FlatList
            ref={flatListRef}
            data={features}
            horizontal
            showsHorizontalScrollIndicator={false}
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

        <FlatList
          ref={flatListRef}
          data={foodTypes}
          horizontal
          showsHorizontalScrollIndicator={true}
          renderItem={renderImages}
          snapToInterval={(Dimensions.get('window').width * 0.9) + (Dimensions.get('window').width * 0.1)} // Width of item + margin
          decelerationRate="normal" // Adjust the snapping speed
          pagingEnabled
          viewabilityConfig={viewabilityConfig}
        />

        <View style={styles.scrollContainer}>
          <View style={styles.content}>
            <Text>Hello</Text>
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // 
    minHeight: Dimensions.get('window').height * 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    backgroundColor: Colors.dark.colors.backGroundColor, // "#4A4356",
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    // backGroundColor: 'black',
    // backgroundColor: 'black'
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height * 0.045,
    paddingHorizontal: Dimensions.get('window').width * 0.1,
    gap: Dimensions.get('window').width * 0.04,
  },
  foodcontainer: {
    position: "absolute",
    // width: Dimensions.get('window').width * 0.8,
    // marginTop: 30,
    // flexWrap: 'wrap',
    // width: (Dimensions.get('window').width * 0.2 + Dimensions.get('window').width * 0.05) * Math.ceil(foodTypes.length / 2), // Adjust the width based on the number of items
  },
  foodTypeContainer: {
    borderRadius: 15,
    marginBottom: Dimensions.get('window').width * 0.04,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.17,
    height: Dimensions.get('window').width * 0.17,
    backgroundColor: "#29272D",
    alignItems: 'center',
  },
  foodTypeImage: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: 20,
  },
  main: {
    flex: 1,
    backgroundColor: "#4A4356" // 
  },
  container: {
    flex: 1,
    // padding: Dimensions.get('window').width * 0.1, // Responsive padding
    position: 'absolute',
  },
  subContainer: {
    position: 'absolute',
    backgroundColor: "#E8DDF7",
    height: Dimensions.get('window').height * 0.3,
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainerMain: {
    
    backgroundColor: "#E8DDF7",
    height: Dimensions.get('window').height * 0.18,
    zIndex: 1,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: Dimensions.get('window').width * 0.1,
    paddingTop: Dimensions.get('window').height * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    
    marginTop: Dimensions.get('window').height * 0.2,
    // marginTop: Dimensions.get('window').height * 0.045,
    // height: 145, // Set a fixed height for the FlatList container
  },
  popularFeatures: {
    marginHorizontal: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.8,
    padding: 12,
    height: 135,
    backgroundColor: "#4A4356",
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    height: '100%'
  },
  popularFeaturesContent: {
    marginRight: 1,
    padding: 7,
    flex: 1, // Ensure content takes available space
  },
  scrollViwerContainer: {
    marginHorizontal: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.8,
    padding: 15,
    gap: 3,
    flexDirection: 'row',
    // marginTop: 0,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
    // height: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: "#4A4356",
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
    // height:
    width: 70,
    paddingVertical: 8, // Adjust padding instead of fixed height
    // paddingHorizontal: 10, // Add padding for horizontal space
    backgroundColor: Colors.dark.colors.primaryColor_Background5,
  },
  buttonTxt: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  NormalTxt: {
    color: "#CBC3CE",
    fontWeight: '500',
    fontSize: 14,
  },
  BoldTxt: {
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 16,
    color: "#E8DDF7",
  },
});

export default Likes;
