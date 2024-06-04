// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';


const Home = () => {

  const [categories, setcategories] = useState([])
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://themealdb.com/api/json/v1/1/categories.php');
      if (!response.ok) {
        console.log('Network response was not ok');
      }
      const data = await response.json();
      if (!data) {
        console.log('Failed to parse response as JSON');
      }
      setcategories(data.categories);
      categories.forEach(category => {
        console.log(category.strCategory);
      });
    } catch (error) {
      console.error("Error loading categories at Home:", error);
    }
  }

  return (
    <View className=" flex align-middle m-16">
      <Text className=" text-indigo-800">Open up App.js to start working on your app!</Text>
      {/* <StatusBar style="auto" /> */}
      <AdjustmentsHorizontalIcon size={36} color={'grey'} />
    </View>
  );
};

export default Home;