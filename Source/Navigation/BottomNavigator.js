import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Home';
import { Dimensions, StyleSheet, View } from 'react-native';
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from '@expo/vector-icons';
import Likes from '../Screen/Like';
import Colors from '../Components/Colors';
import OrderHistory from '../Screen/OrderHistory';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Dimensions.get('window').height * 0.08,
          backgroundColor: "black",
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          // let backgroundColor = focused ? "#4A4356" : "transparent";
          let IconColor = focused ? Colors.dark.colors.diffrentColorOrange : Colors.dark.colors.secComponentColor;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Likes') {
            iconName = focused ? 'heart-sharp' : 'heart-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'bag-handle-sharp' : 'bag-handle-outline';
          }

          return (
            // style={[styles.container, { backgroundColor }]}
            <View >
              <Ionicons name={iconName} size={24} style={{ color: IconColor }} />
            </View>
          );
        },
        // tabBarLabel: ({ focused }) => {
        //   let label;
        //   if (route.name === 'Home') {
        //     label = 'Home';
        //   } else if (route.name === 'Likes') {
        //     label = 'Wants';
        //   } else if (route.name === 'Orders') {
        //     label = 'Orders';
        //   } 

        //   return (
        //     <Text style={{ color: focused ? "#E4DFE5" : "#CBC3CF", fontSize: 12, marginTop: -2, marginBottom: 2 }}>
        //       {label}
        //     </Text>
        //   );
        // },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Orders" component={OrderHistory} />
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
