// Commented code is for designing of bottom Navigatior like insIIT

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Components/Colors';

import Home from '../Screen/Home';
import Likes from '../Screen/Like';
import OrderHistory from '../Screen/OrderHistory';
import HomeSeller from '../Screen/HomeSeller';
import { useContext } from 'react';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import OrderHistorySeller from '../Screen/OrderHistorySeller';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ToastNotification from '../Components/ToastNotification';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Error from '../Components/Error';

const Tab = createBottomTabNavigator();
export default function BuyerBottomNavigator() {
  const navigation = useNavigation();
  // const { userData } = useContext(GlobalStateContext);
  const { userRole } = useContext(GlobalStateContext);
  const [showToast, setShowToast] = useState(false);


  const [isRoleDefined, setIsRoleDefined] = useState(false);
  // const [userRole, setUserRole] = useState(null);

  // useEffect(() => {
  //   if (userData.role) {
  //     setUserRole(userData.role);
  //     setIsRoleDefined(true);
  //   }
  // }, [userData]);

  useEffect(() => {
    if (userRole) {
      // setUserRole(userData.role);
      setIsRoleDefined(true);
    }
  }, [userRole]);

  if (!isRoleDefined) {
    return <Error />;
  }

  return (
    <>
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
        {
          userRole == 'Seller' ?
            <Tab.Screen name="Home" component={HomeSeller} /> :
            <Tab.Screen name="Home" component={Home} />
        }

        {
          userRole == 'Seller' ?
            null :
            <Tab.Screen name="Likes" component={Likes} />
        }
        {
          userRole == 'Seller' ?
            <Tab.Screen
              options={{
                headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()} className='px-4'><Ionicons name="chevron-back-outline" size={24} color={Colors.dark.colors.mainTextColor} /></TouchableOpacity>,
                headerRight: () => (
                  <TouchableOpacity onPress={() => setShowToast(!showToast)} className='px-4'>
                    <Ionicons name="ellipsis-vertical-outline" size={24} color={Colors.dark.colors.mainTextColor} />
                  </TouchableOpacity>
                ),
                headerShown: true,
                headerTitle: 'Your Orders',
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
              name="Orders"
              component={OrderHistorySeller}
            />
            :
            <Tab.Screen
              options={{
                headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()} className='px-4'><Ionicons name="chevron-back-outline" size={24} color={Colors.dark.colors.mainTextColor} /></TouchableOpacity>,
                headerRight: () => (
                  <TouchableOpacity onPress={() => setShowToast(!showToast)} className='px-4'>
                    <Ionicons name="ellipsis-vertical-outline" size={24} color={Colors.dark.colors.mainTextColor} />
                  </TouchableOpacity>
                ),
                headerShown: true,
                headerTitle: 'Your Purchases',
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
              name="Orders"
              component={OrderHistory}
            />
        }
      </Tab.Navigator>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 5,
//     paddingHorizontal: 25,
//     borderRadius: 99,
//   },
// });