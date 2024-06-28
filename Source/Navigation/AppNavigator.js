import React, { Profiler, useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/Home';
import CartScreen from '../Screen/Cart';
import BottomNavigator from './BottomNavigator';
import Login from '../Screen/Login';
import Details from '../Screen/Details';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SelectAddress from '../Screen/SelectAddress';
import Profile from '../Screen/Profile';
import Colors from '../Components/Colors';
import IndiviualCart from '../Screen/IndiviualCart';
import SignupScreen from '../Screen/SignupScreen';
import LoginScreen from '../Screen/LoginScreen';
import MainScreen from '../Screen/MainScreen';
import StaterScreen from '../Screen/StaterScreen';
import ModalScreen from '../Screen/ModelScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderHistory from '../Screen/OrderHistory';
import YettoUpdate from '../Screen/YettoUpdate';

const Stack = createStackNavigator();

const HeaderRightIcons = () => (
    <View style={{ flexDirection: 'row', marginRight: 10 }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <Ionicons name="search-outline" size={24} color={Colors.dark.colors.mainTextColor} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <Ionicons name="heart-outline" size={24} color={Colors.dark.colors.mainTextColor} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <Ionicons name="arrow-redo-outline" size={24} color={Colors.dark.colors.mainTextColor} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
            <Ionicons name="ellipsis-vertical-outline" size={24} color={Colors.dark.colors.mainTextColor} />
        </TouchableOpacity>
    </View>
);

const CustomBackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
            <Ionicons name="chevron-back-outline" size={24} color={Colors.dark.colors.mainTextColor} />
        </TouchableOpacity>
    );
};

export default function AppNavigator() {

    const [isLoggedInValue, setisLoggedInValue] = useState(false)

    const handle_isLoggedIn = async () => {
        const isLoggedInData = await AsyncStorage.getItem('isLoggedIn');
        setisLoggedInValue(isLoggedInData);
        console.log(isLoggedInValue, isLoggedInData, "App")
    }

    useEffect(() => {
        handle_isLoggedIn();
    }, [isLoggedInValue]);


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={Login} /> */}
                {isLoggedInValue ?
                    (
                        <>
                            <Stack.Screen
                                name="HomeScreen"
                                options={{ headerShown: false }}
                                component={BottomNavigator}
                            />
                            {/* <Stack.Screen
                                name="StaterScreen"
                                component={StaterScreen}
                            /> */}
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="StaterScreen"
                                component={StaterScreen}
                            />
                            <Stack.Screen
                                name="HomeScreen"
                                options={{ headerShown: false }}
                                component={BottomNavigator}
                            />
                        </>
                    )}
                <Stack.Screen
                    name="SignupScreen"
                    component={SignupScreen}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Details"
                    options={{
                        headerStyle: {
                            backgroundColor: Colors.dark.colors.backGroundColor,
                        },
                        headerShown: true,
                        title: '',
                        headerTintColor: Colors.dark.colors.mainTextColor,
                        // headerLeft: () => <CustomBackButton />,
                        headerRight: () => <HeaderRightIcons />
                    }}
                    component={Details}
                />
                <Stack.Screen
                    name="OrderHistory"
                    component={OrderHistory}
                />
                <Stack.Screen
                    name="IndiviualCart"
                    component={IndiviualCart}
                />
                <Stack.Screen
                    name="SelectAddress"
                    options={{ headerShown: true, title: 'Select Your Location' }}
                    component={SelectAddress}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                />
                <Stack.Screen
                    name="ModalScreen"
                    component={ModalScreen}
                />
                <Stack.Screen
                    name="YettoUpdate"
                    component={YettoUpdate}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}