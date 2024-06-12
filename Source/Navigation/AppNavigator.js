import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/Home';
import CartScreen from '../Screen/Cart';
import BottomNavigator from './BottomNavigator';
import Login from '../Screen/Login';
import Details from '../Screen/Details';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const HeaderRightIcons = () => (
    <View style={{ flexDirection: 'row', marginRight: 10 }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <Ionicons name="heart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
    </View>
);

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={Login} /> */}
                <Stack.Screen
                    name="HomeScreen"
                    options={{ headerShown: false }}
                    component={BottomNavigator}
                />
                <Stack.Screen
                    name="Details"
                    options={{ headerShown: true, headerRight: () => <HeaderRightIcons />}}
                    component={Details}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}