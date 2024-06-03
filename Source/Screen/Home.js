import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { images } from '../Data/images';
import foodTypes from '../Data/foodtype';
import { mockcampus_home_popular } from '../Data/mockcampus_home_popular';

import Colors from '../Components/Colors';
import ScrollViewer from '../Components/scrollViwer';


const Home = () => {
  const [verticalScrollHeight, setVerticalScrollHeight] = useState(0);
  const { colors } = useTheme();
  const [features, setFeatures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const bufferForsearchBodyContainer = Dimensions.get('window').height * 0.52;
  const bufferForpopularFeatureBodyContainer = Dimensions.get('window').height * 0.30;
  const bufferForscrollViwerContainer = Dimensions.get('window').height * 0.27;
  const bufferForfoodItemCollectionContainer = Dimensions.get('window').height * 0.03;

  let index = 0;

  const createZIndexForVerticalScroll = (buffer) => {
    index++;
    console.log("done " + index);
    return {
      // backgroundColor: verticalScrollHeight < buffer ? 'white' : 'black',
      zIndex: verticalScrollHeight < (buffer + Dimensions.get('window').height * 0.01) ? 1 : 0,
    };
  };

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

  const renderPopularFeatureContainer = ({ item, index }) => (
    <View style={styles.popularFeatureBodyContainer}>
      <View style={styles.popularFeatureSplitContainer}>

        <Image source={images[item.image]} style={styles.popularFeatureImage} alt="Feature" />
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

  // Checks ------------------- can me moved to common or not
  const onViewablePopularFeatureChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderFoodItemContainer = ({ item }) => (
    <View style={styles.foodItemCollectionContainer}>
      <View style={styles.foodItemBodyContainer}>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.foodItemBodyContainer}>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.foodItemBodyContainer}>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.foodItemBodyContainer}>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.foodItemContainer}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyBGContainer} />
      <View style={styles.staticContainer}>

        <View style={[createZIndexForVerticalScroll(bufferForsearchBodyContainer), styles.searchBodyContainer]}>
          <TextInput placeholder='Search' style={styles.searchInputTxt}></TextInput>
          <Ionicons name="search" size={24} style={styles.searchIcon} />
        </View>

        <View style={[createZIndexForVerticalScroll(bufferForpopularFeatureBodyContainer)]}>
          <FlatList
            ref={flatListRef}
            data={features}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderPopularFeatureContainer}
            keyExtractor={(item, index) => index.toString()}
            snapToInterval={(Dimensions.get('window').width * 0.9) + (Dimensions.get('window').width * 0.1)} // Width of item + margin
            decelerationRate="normal" // Adjust the snapping speed
            pagingEnabled
            onViewableItemsChanged={onViewablePopularFeatureChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </View>
        <View style={[createZIndexForVerticalScroll(bufferForscrollViwerContainer), styles.scrollViwerContainer]}>
          <ScrollViewer data={features} currentIndex={currentIndex} />
        </View>

        <View style={[createZIndexForVerticalScroll(bufferForfoodItemCollectionContainer)]}>
          <FlatList
            ref={flatListRef}
            data={foodTypes}
            horizontal
            showsHorizontalScrollIndicator={true}
            renderItem={renderFoodItemContainer}
            snapToInterval={(Dimensions.get('window').width * 0.9) + (Dimensions.get('window').width * 0.1)} // Width of item + margin
            decelerationRate="normal" // Adjust the snapping speed
            pagingEnabled
            viewabilityConfig={viewabilityConfig}
          />
        </View>

      </View>

      <ScrollView
        onScroll={e => setVerticalScrollHeight(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={6}
        keyboardDismissMode='on-drag'
      >
        <View style={styles.verticalScrollContainer}>
          <View style={styles.content}>
            <Text>Hello</Text>
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({

  bodyContainer: {
    flex: 1,
    backgroundColor: "#4A4356" // bg color
  },
  bodyBGContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height * 0.3,
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#E8DDF7", // bg color
  },

  staticContainer: {
    flex: 1,
    position: 'absolute',
  },

  searchBodyContainer: {
    zIndex: 1,
    paddingHorizontal: Dimensions.get('window').width * 0.1, // should be applyed to all fixed items
    marginTop: Dimensions.get('window').height * 0.08, // should be applyed to all fixed items
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.07,
  },
  searchInputTxt: {
    width: '73%',
    height: '100%',
    // padding: 14,
    paddingLeft: 14,
    textAlignVertical: 'center',
    fontSize: 16, // font size
    backgroundColor: Colors.dark.colors.primaryColor_Background2, // bg color
    borderRadius: 14,
  },
  searchIcon: {
    height: '100%',
    width: '20%',
    // padding: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.dark.colors.primaryColor_Background2, // bg color
    borderRadius: 14,
  },

  popularFeatureBodyContainer: {
    marginHorizontal: Dimensions.get('window').width * 0.1,  // should be applyed to all fixed items
    marginTop: Dimensions.get('window').height * 0.04, // should be applyed to all fixed items
    height: Dimensions.get('window').height * 0.18,
    width: Dimensions.get('window').width * 0.8,
    padding: 12,
    backgroundColor: "#4A4356", // bg color
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  popularFeatureSplitContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularFeatureImage: {
    height: '100%',
    width: '58%', // Adjust width for responsiveness
    borderWidth: 2,
    borderColor: 'black', // border color
    borderRadius: 14,
  },
  popularFeaturesContent: {
    flex: 1,
    padding: 7,
  },

  scrollViwerContainer: { //Checks ----- not in center 
    marginHorizontal: Dimensions.get('window').width * 0.1,  // should be applyed to all fixed items
    height: Dimensions.get('window').height * 0.03,
    gap: 3,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "#4A4356", // bg color
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
  },

  foodItemCollectionContainer: {
    marginHorizontal: Dimensions.get('window').width * 0.1,  // should be applyed to all fixed items
    marginTop: Dimensions.get('window').height * 0.04, // should be applyed to all fixed items
    height: Dimensions.get('window').height * 0.20,
    width: Dimensions.get('window').width * 0.8,
    flexDirection: 'row',
    gap: Dimensions.get('window').width * 0.04,
    // justifyContent: 'space-between', // can be also appled
  },
  foodItemBodyContainer: {
    rowGap: Dimensions.get('window').width * 0.04,
    // justifyContent: 'space-between', // can be also appled
  },
  foodItemContainer: {
    width: Dimensions.get('window').width * 0.169,
    height: Dimensions.get('window').width * 0.169,
    backgroundColor: "#29272D", // bg color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  verticalScrollContainer: {
    marginTop: Dimensions.get('window').height * 0.67,
    minHeight: Dimensions.get('window').height * 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    backgroundColor: Colors.dark.colors.backGroundColor, // bg color
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },



  // Common Styling
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Home;
