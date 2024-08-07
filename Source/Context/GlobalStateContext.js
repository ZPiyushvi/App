// GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';
export const GlobalStateContext = createContext();
import { mockCampusShops } from "../Data/mockCampusShops";
import { mockCampusMenu } from "../Data/mockCampusMenu";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALLOUTLETS_ENDPOINT, API_BASE_URL, USEROUTLETS_ENDPOINT, USERSDATA_ENDPOINT } from '../Constants/Constants';
import { Alert } from 'react-native';
import { useFonts } from 'expo-font';

const filterRecentHistory = (history) => {
  const currentDate = new Date();
  const sixtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 3));

  return history.filter(entry => new Date(entry.Noformatdate) >= sixtyDaysAgo);
};


export const GlobalStateProvider = ({ children }) => {
  const [cartItemsNEW, setCartItemsNEW] = useState([]);
  const [userRole, setUserRole] = useState(null);

  const [vegMode, setVegMode] = useState(false);
  const [CartItems, setCartItems] = useState([]);
  const [campusShops, setcampusShops] = useState([]);
  const [campusMenu, setcampusMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [updatedCartWithDetails, setUpdatedCartWithDetails] = useState([]);
  const [dateGroup, setDateGroup] = useState([]);
  const [History, setHistory] = useState([]);
  const [outlets, setOutlets] = useState([]);


  const [outletsNEW, setOutletsNEW] = useState([]);

  const [outletsNEW2, setOutletsNEW2] = useState([]);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token)
      // http://192.168.1.3:5001/userdata
      const response = await fetch(`${API_BASE_URL}:${USERSDATA_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      // console.log('data', data)
      setUserData(data.data)
      // console.log("userData", "home", data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUserOutlets2();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const getUserOutlets2 = async () => {
    try {
      // const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.138.12:5001/alloutlets2'); // Correct the URL

      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }

      const data = await response.json();

      setOutletsNEW(data.data);
      // console.log('geeting',  JSON.stringify(outletsNEW, null, 2))
    } catch (error) {
      console.error('Error fetching user outlets:', error);
    }
  };
  // console.log('geeting',  JSON.stringify(outletsNEW, null, 2))
  const [fontFamilies, setFontFamilies] = useState({});

  const [fontsLoaded] = useFonts({
    'AddFont_Bold': require('./../../assets/fonts/staticNunito/Nunito-Bold.ttf'),
    'AddFont_Medium': require('./../../assets/fonts/staticNunito/Nunito-Medium.ttf'),
    'AddFont_Regular': require('./../../assets/fonts/staticNunito/Nunito-Regular.ttf'),
    'AddFont_SemiBold': require('./../../assets/fonts/staticNunito/Nunito-SemiBold.ttf'),
  });
  
  useEffect(() => {
    if (fontsLoaded) {
      setFontFamilies({
        regular: 'AddFont_Regular',
        medium: 'AddFont_Medium',
        semiBold: 'AddFont_SemiBold',
        bold: 'AddFont_Bold',
        none : 'none',
      });
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}:${ALLOUTLETS_ENDPOINT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });

        if (!response.ok) {
          Alert.alert("Network response was not ok");
          // throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOutletsNEW(data.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error saving menu:", error);
        // setLoading(false);
      }
    };
    fetchOutlets();
  }, []);

  useEffect(() => {
    getUserOutlets();
  }, []);

  const getUserOutlets = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}:${USEROUTLETS_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      setOutlets(data.data);
    } catch (error) {
      console.error('Error fetching user outlets:', error);
    }
  };
  // console.log(outlets)

  useEffect(() => {
    const groupOrdersByDate = (orders) => {
      const groupedOrders = orders.reduce((acc, order) => {
        const { date, totalPrice, Noformatdate } = order;
        if (!acc[date]) {
          acc[date] = { total: 0, orders: [], Noformatdate: '' };
        }
        acc[date].total += totalPrice;
        acc[date].orders.push(order);
        acc[date].Noformatdate = Noformatdate;
        return acc;
      }, {});
      return groupedOrders;
    }

    const groupedOrders = groupOrdersByDate(History);

    const DateGroup = Object.keys(groupedOrders).map(date => ({
      date,
      total: groupedOrders[date].total,
      orders: groupedOrders[date].orders,
      Noformatdate: groupedOrders[date].Noformatdate
    }));

    setDateGroup(DateGroup);

  }, [History]);

  // ------------------------ getUserRole && getVegData ----------------------------------------//
  useEffect(() => {
    const getUserRole = async () => {
      try {
        const storedUserRole = await AsyncStorage.getItem('userRole');
        if (storedUserRole !== null) setUserRole(JSON.parse(storedUserRole));
      } catch (error) {
        console.error('Error fetching storedUserRole:', error);
      }
    };
    getUserRole();

    const getVegData = async () => {
      try {
        const storedVegMode = await AsyncStorage.getItem('vegMode');
        if (storedVegMode !== null) setVegMode(JSON.parse(storedVegMode));
      } catch (error) {
        console.error('Error fetching storedVegMode:', error);
      }
    };
    getVegData();
  }, []);

  useEffect(() => {
    const updatedCart = Object.entries(CartItems)
      .map(([storeName, items]) => {
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const store = mockCampusShops.find(shop => shop.name === storeName);
        if (store) {
          const { menu, ...storeDetails } = store; // Exclude the menu
          return {
            storeName,
            storeDetails,
            items,
            totalPrice
          };
        }
        return {
          storeName,
          storeDetails: null,
          items,
          totalPrice
        };
      })
      .filter(cart => cart.items.length > 0 && cart.totalPrice > 0); // Filter out stores with no items or total price 0
    setUpdatedCartWithDetails(updatedCart);
  }, [CartItems]);

  useEffect(() => {
    setOutletsNEW(vegMode ? outletsNEW.filter(shop => shop.type === "PureVeg") : outletsNEW);
    setcampusMenu(vegMode ? mockCampusMenu.filter(shop => shop.type === "Veg") : mockCampusMenu);
  }, [vegMode]);

  const updateQuantity = (id, newQuantity) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [id]: newQuantity
    }));
  };


  const saveHistory = async (history) => {
    try {
      const filteredHistory = filterRecentHistory(history);
      const jsonValue = JSON.stringify(filteredHistory);
      await AsyncStorage.setItem('@history', jsonValue);
    } catch (e) {
      console.error("Error saving history", e);
    }
  };

  const loadHistory = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@history');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error loading history", e);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const loadedHistory = await loadHistory();
      setHistory(filterRecentHistory(loadedHistory));
    })();
  }, []);

  useEffect(() => {
    saveHistory(History);
  }, [History]);

  // const fetchFeatures = async () => {
  // setcampusShops(mockCampusShops)
  // setcampusMenu(mockCampusMenu)
  // try {
  //   const response = await fetch('https://fdbb94ad-4fe0-4083-8c28-aaf22b8d5dad.mock.pstmn.io/mockcampus/home/popular');
  //   if (!response.ok) {
  //     console.log('Network response was not ok');
  //   }
  //   const data = await response.json();
  //   console.log(data)
  //   setFeatures(data);
  //   if (!data) {
  //     console.log('Failed to parse response as JSON');
  //   }
  // } catch (error) {
  //   console.error("Error loading features:", error);
  // }
  // };

  return (
    <GlobalStateContext.Provider value={{ fontsLoaded, fontFamilies, userData, cartItemsNEW, setCartItemsNEW, outletsNEW, setOutletsNEW, outlets, userRole, setUserRole, dateGroup, History, setHistory, campusShops, setcampusShops, quantity, setQuantity, campusMenu, setcampusMenu, CartItems, setCartItems, updateQuantity, updatedCartWithDetails, setUpdatedCartWithDetails, vegMode, setVegMode }}>
      {children}
    </GlobalStateContext.Provider>
  );
};