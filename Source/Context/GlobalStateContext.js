// GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';
export const GlobalStateContext = createContext();
import { mockCampusShops } from "../Data/mockCampusShops";
import { mockCampusMenu } from "../Data/mockCampusMenu";
import AsyncStorage from '@react-native-async-storage/async-storage';

const filterRecentHistory = (history) => {
  const currentDate = new Date();
  const sixtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 3));

  return history.filter(entry => new Date(entry.Noformatdate) >= sixtyDaysAgo);
};


export const GlobalStateProvider = ({ children }) => {
  // const [userRole, setUserRole] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [vegMode, setVegMode] = useState(false);
  const [CartItems, setCartItems] = useState([]);
  const [campusShops, setcampusShops] = useState([]);
  const [campusMenu, setcampusMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [updatedCartWithDetails, setUpdatedCartWithDetails] = useState([]);
  const [dateGroup, setDateGroup] = useState([]);
  const [History, setHistory] = useState([]);

  useEffect(() => {
    const groupOrdersByDate = (orders) => {
      const groupedOrders = orders.reduce((acc, order) => {
        const { date, totalPrice, Noformatdate } = order;
        if (!acc[date]) {
          acc[date] = { total: 0, orders: [], Noformatdate: ''};
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
        if (storedUserRole !== null) setVegMode(JSON.parse(storedUserRole));
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
    setcampusShops(vegMode ? mockCampusShops.filter(shop => shop.type === "Veg") : mockCampusShops);
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
    <GlobalStateContext.Provider value={{ userRole, setUserRole, dateGroup, History, setHistory, campusShops, setcampusShops, quantity, setQuantity, campusMenu, setcampusMenu, CartItems, setCartItems, updateQuantity, updatedCartWithDetails, setUpdatedCartWithDetails, vegMode, setVegMode }}>
      {children}
    </GlobalStateContext.Provider>
  );
};