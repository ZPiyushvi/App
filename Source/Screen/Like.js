import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { mockCampusShops } from '../Data/mockCampusShops';
import MasonryList from '@react-native-seoul/masonry-list';
import CoffeeCard from '../Components/CoffeeCart';

export default function Like() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recipe</Text>
      <View>
        <FlatList
          data={mockCampusShops}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
          columnWrapperStyle={{
            justifyContent: 'space-between'
          }}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
        {/* <MasonryList
          data={mockCampusShops}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.masonryContentContainer}
          columnWrapperStyle={styles.masonryColumnWrapper}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        /> */}
      </View>
    </View>
  );
}

const renderItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <CoffeeCard data={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 33,
    fontWeight: '600',
    color: '#4B5563', // Neutral-600 color
    marginBottom: 20,
  },
  masonryContentContainer: {
    paddingBottom: 50,
    paddingTop: 20,
  },
  masonryColumnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
});

