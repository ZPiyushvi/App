import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Home';
import Cart from '../Screen/Cart';
import { StyleSheet, Text, View } from 'react-native';
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from '@expo/vector-icons';
import Likes from '../Screen/Like';
import Profile from '../Screen/Profile';
import Colors from '../Components/Colors';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 75,
          backgroundColor: "#29272D",
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let backgroundColor = focused ? "#4A4356" : "transparent";
          let IconColor = focused ? "#E8DDF7" : "#CBC3CE";

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Likes') {
            iconName = focused ? 'heart-sharp' : 'heart-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'bag-handle-sharp' : 'bag-handle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ellipsis-horizontal-sharp' : 'ellipsis-horizontal-sharp';
          }

          return (
            <View style={[styles.container, { backgroundColor }]}>
              <Ionicons name={iconName} size={24} style={{ color: IconColor }} />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === 'Home') {
            label = 'Home';
          } else if (route.name === 'Likes') {
            label = 'Wants';
          } else if (route.name === 'Cart') {
            label = 'Cart';
          } else if (route.name === 'Profile') {
            label = 'More';
          }

          return (
            <Text style={{ color: focused ? "#E4DFE5" : "#CBC3CF", fontSize: 12, marginTop: -9, marginBottom: 9 }}>
              {label}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Cart" component={Cart} />
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 25,
    borderRadius: 99,
  },
});
