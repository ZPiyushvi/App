import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/Home';
import CartScreen from '../Screen/Cart';
import BottomNavigator from './BottomNavigator';
import Login from '../Screen/Login';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="HomeScreen"
                    options={{ headerShown: false }}
                    component={BottomNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}