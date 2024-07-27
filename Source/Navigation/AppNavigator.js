import React, { Profiler, useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from '../Screen/Details';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SelectAddress from '../Screen/SelectAddress';
import Profile from '../Screen/Profile';
import Colors from '../Components/Colors';
import IndiviualCart from '../Screen/IndiviualCart';
import SignupScreen from '../Screen/SignupScreen';
import LoginScreen from '../Screen/LoginScreen';
import RoleSelection from '../Screen/RoleSelection';
import StaterScreen from '../Screen/StaterScreen';
import ModalScreen from '../Screen/ModelScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderHistory from '../Screen/OrderHistory';
import YettoUpdate from '../Screen/YettoUpdate';
import DetailView from '../Screen/ItemDetails';
import BuyerBottomNavigator from './BuyerBottomNavigator';
import Insights from '../Screen/Insights';
import EditRestorent from '../Screen/EditRestorent';
import EditMain from '../Screen/EditMain';
import SplashScreen from '../Screen/SplashScreen';

const Stack = createStackNavigator();


const CustomBackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity className='px-4' onPress={() => navigation.goBack()} >
            <Ionicons name="arrow-back" size={24} color={Colors.dark.colors.mainTextColor} />
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

    const [showToast, setShowToast] = useState(false);

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
            <TouchableOpacity onPress={() => setShowToast(!showToast)} style={{ marginHorizontal: 5 }}>
                <Ionicons name="ellipsis-vertical-outline" size={24} color={Colors.dark.colors.mainTextColor} />
            </TouchableOpacity>
        </View>
    );

    const LoginNavigationStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen
                name="StaterScreen"
                component={StaterScreen}
            /> */}
            <Stack.Screen
                name="RoleSelection"
                component={RoleSelection}
            />
            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
            />

            <Stack.Screen
                name="BuyerNavigationStack"
                options={{ headerShown: false }}
                component={BuyerNavigationStack}
            />
        </Stack.Navigator>
    )

    const BuyerNavigationStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="HomeScreen"
                options={{ headerShown: false }}
                component={BuyerBottomNavigator}
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
                name="DetailView"
                component={DetailView}
            />
            <Stack.Screen
                name="OrderHistory"
                component={OrderHistory}
            />
            <Stack.Screen
                options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: Colors.dark.colors.backGroundColor,
                    },
                    headerShown: true,
                    title: route.params?.item?.name || '', // Default to an empty string if storeName is not provided
                    headerTintColor: Colors.dark.colors.mainTextColor,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: Colors.dark.colors.mainTextColor,
                        textAlign: 'center', // Center the title
                    },
                })}
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
            <Stack.Screen
                name="EditRestorent"
                component={EditRestorent}
            />
            <Stack.Screen
                name="EditMain"
                component={EditMain}
            />
            <Stack.Screen
                name="Insights"
                component={Insights}
                options={{
                    headerLeft: () => <CustomBackButton />,
                    headerRight: () =>
                        <TouchableOpacity className='px-4'>
                            <Ionicons name="ellipsis-vertical-outline" size={24} color={Colors.dark.colors.mainTextColor} />
                        </TouchableOpacity>
                    ,
                    headerShown: true,
                    headerTitle: 'Insights',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        // height: 65,
                        backgroundColor: Colors.dark.colors.backGroundColor, //'black'
                    },
                    headerTitleStyle: {
                        fontWeight: '900',
                        fontSize: 24,
                    },
                    headerTintColor: Colors.dark.colors.mainTextColor, //Colors.dark.colors.diffrentColorOrange,
                }}
            />
            <Stack.Screen
                name="LoginNavigationStack"
                component={LoginNavigationStack}
            />
        </Stack.Navigator>
    )

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        // Show splash screen for at least 3 seconds
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <NavigationContainer>
            {showToast &&
                <View className=' absolute w-full h-full z-40'>
                    <TouchableOpacity className=' w-full h-full z-30' onPress={() => { setShowToast(false) }}
                    // style={{backgroundColor: 'rgba(355, 355, 355, 0.07)'}} 
                    />
                    <View className='absolute pl-3 z-40 rounded-xl mt-12 mr-2 flex-1 top-0 right-0 w-[43%]' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                        <TouchableOpacity onPress={() => { setShowToast(false); navigation.navigate('Profile'); }} numberOfLines={1} ellipsizeMode='tail' className='font-black text-base py-3' style={{ color: Colors.dark.colors.mainTextColor }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setShowToast(false); navigation.navigate('Insights'); }} numberOfLines={1} ellipsizeMode='tail' className='font-black text-base py-3' style={{ color: Colors.dark.colors.mainTextColor }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>InSights</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setShowToast(false); navigation.navigate('YettoUpdate'); }} numberOfLines={1} ellipsizeMode='tail' className='font-black text-base py-3' style={{ color: Colors.dark.colors.mainTextColor }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Wallet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setShowToast(false); }} numberOfLines={1} ellipsizeMode='tail' className='font-black text-base py-3' style={{ color: Colors.dark.colors.mainTextColor }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isSplashVisible ? (
                    <Stack.Screen name='Splash' component={SplashScreen} />
                ) : isLoggedInValue ? (
                    <Stack.Screen name='BuyerNavigationStack' component={BuyerNavigationStack} />
                ) : (
                    <>
                        <Stack.Screen name='StarterScreen' component={StarterScreen} />
                        <Stack.Screen name='LoginNavigationStack' component={LoginNavigationStack} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}