// GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';
export const GlobalStateContext = createContext();
// import { mockCampusShops } from "../Data/mockCampusShops";
import { mockCampusMenu } from "../Data/mockCampusMenu";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALLOUTLETS2_ENDPOINT, ALLOUTLETS_ENDPOINT, API_BASE_URL, USEROUTLETS_ENDPOINT, USERSDATA_ENDPOINT } from '../Constants/Constants';
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
  const [darkMode, setDarkMode] = useState(false);

  const [CartItems, setCartItems] = useState([]);
  const [campusShops, setcampusShops] = useState([]);
  const [campusMenu, setcampusMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [updatedCartWithDetails, setUpdatedCartWithDetails] = useState([]);
  const [dateGroup, setDateGroup] = useState([]);
  const [History, setHistory] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [outletsNEW, setOutletsNEW] = useState([]);
  const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("token");
  //     console.log(token)
  //     if (!token) {
  //       console.log('err [Token not found in GlobalState]');
  //       return (
  //         <Error
  //           heading="Network Error"
  //           content={`We’re sorry for the inconvenience. It looks like your session has expired due to inactivity or other reasons. Our team is constantly working to improve your experience.
  //           \n Please log out and log back in to refresh your session. Thank you for your understanding and patience!`}
  //         />
  //       );
  //     }
  //     // http://192.168.1.3:5001/userdata
  //     const response = await fetch(`${API_BASE_URL}:${USERSDATA_ENDPOINT}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ token: token })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response /userdata in GlobalState was not ok ' + response.statusText);
  //     }

  //     const data = await response.json();
  //     console.log("/userdata in GlobalState", data.data)
  //     setUserData(data.data)
  //   } catch (error) {
  //     console.error('Error fetching /userdata in GlobalState:', error);
  //   }
  // };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUserOutlets2();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const getUserOutlets2 = async () => {

    try {
      // const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}:${ALLOUTLETS2_ENDPOINT}`); // Correct the URL

      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }

      const data = await response.json();

      if (outletsNEW !== data.data) {
        setOutletsNEW(data.data);
      }

      // console.log('geeting',  JSON.stringify(outletsNEW, null, 2))
    } catch (error) {
      console.error('Error fetching user outlets:', error);
    }
  };
  const [fontFamilies, setFontFamilies] = useState({});

  const [fontsLoaded] = useFonts({
    'Zain_Black': require('./../../assets/fonts/Zain/Zain-Black.ttf'),
    'Zain_ExtraBold': require('./../../assets/fonts/Zain/Zain-ExtraBold.ttf'),
    'Zain_Bold': require('./../../assets/fonts/Zain/Zain-Bold.ttf'),
    'Zain_Light': require('./../../assets/fonts/Zain/Zain-Light.ttf'),
    'Zain_ExtraLight': require('./../../assets/fonts/Zain/Zain-ExtraLight.ttf'),
    'Zain_Regular': require('./../../assets/fonts/Zain/Zain-Regular.ttf'),

    'Nunito_Black': require('./../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    'Nunito_ExtraBold': require('./../../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
    'Nunito_Bold': require('./../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'Nunito_Light': require('./../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    'Nunito_ExtraLight': require('./../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    'Nunito_Medium': require('./../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setFontFamilies({
        Zain_black: 'Zain_Black',
        Zain_extrabold: 'Zain_ExtraBold',
        Zain_bold: 'Zain_Bold',
        Zain_regular: 'Zain_Regular',
        Zain_light: 'Zain_Light',
        Zain_extralight: 'Zain_ExtraLight',

        Nunito_black: 'Nunito_Black',
        Nunito_extrabold: 'Nunito_ExtraBold',
        Nunito_bold: 'Nunito_Bold',
        Nunito_medium: 'Nunito_Medium',
        Nunito_light: 'Nunito_Light',
        Nunito_extralight: 'Nunito_ExtraLight',
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
        if (outletsNEW !== data.data) {
          setOutletsNEW(data.data);
        }
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

      if (!token) {
        return console.log('err [Token not found]');
      }

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

    const getDarkData = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        if (storedDarkMode !== null) setDarkMode(JSON.parse(storedDarkMode));
      } catch (error) {
        console.error('Error fetching storedDarkMode:', error);
      }
    };
    getDarkData();
  }, []);

  // useEffect(() => {
  //   const updatedCart = Object.entries(CartItems)
  //     .map(([storeName, items]) => {
  //       const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  //       const store = mockCampusShops.find(shop => shop.name === storeName);
  //       if (store) {
  //         const { menu, ...storeDetails } = store; // Exclude the menu
  //         return {
  //           storeName,
  //           storeDetails,
  //           items,
  //           totalPrice
  //         };
  //       }
  //       return {
  //         storeName,
  //         storeDetails: null,
  //         items,
  //         totalPrice
  //       };
  //     })
  //     .filter(cart => cart.items.length > 0 && cart.totalPrice > 0); // Filter out stores with no items or total price 0
  //   setUpdatedCartWithDetails(updatedCart);
  // }, [CartItems]);

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


  let segregatedData = {};

  const [segregatedDataList, setSegregatedDataList] = useState()

  function segregateData(outlets) {
    segregatedData = {}; // Reset segregatedData

    outlets.forEach(store => {
      store.menu.forEach(menu => {
        menu.items.forEach(item => {
          const itemKey = item.item;
          if (!segregatedData[itemKey]) {
            segregatedData[itemKey] = {
              name: itemKey,
              image: item.image,
              availability: [],
              rating: item.rating,
              ratingcount: item.ratingcount,
              menutype: menu.title,
              type: item.type,
              featured: store.featured
            };
          }
          const availabilityDetails = {
            location: store.location,
            menutype: menu.title,
            type: item.type,
            name: store.name,
            price: item.price,
            upiId: store.upiId,
            shopkeepername: store.shopkeeperName,
            image: store.image,
            rating: item.rating,
            ratingcount: item.ratingcount
          };
          segregatedData[itemKey].availability.push(availabilityDetails);
        });
      });
    });

    if (segregatedData != segregatedDataList) {
      console.log('run2')
      setSegregatedDataList(Object.values(segregatedData));
    }
  }

  useEffect(() => {
    segregateData(outletsNEW);
  }, [outletsNEW]);


  return (
    <GlobalStateContext.Provider value={{ fontsLoaded, fontFamilies, userData, setUserData, cartItemsNEW, setCartItemsNEW, outletsNEW, setOutletsNEW, outlets, userRole, setUserRole, dateGroup, History, setHistory, campusShops, setcampusShops, quantity, setQuantity, campusMenu, setcampusMenu, CartItems, setCartItems, updateQuantity, updatedCartWithDetails, setUpdatedCartWithDetails, vegMode, setVegMode, setDarkMode, darkMode }}>
      {children}
    </GlobalStateContext.Provider>
  );
};