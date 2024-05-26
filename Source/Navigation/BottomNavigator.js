import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Home';
import Cart from '../Screen/Cart';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} />
      </Tab.Navigator>
  );
}
