// GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';
export const GlobalStateContext = createContext();
import { mockCampusShops } from "../Data/mockCampusShops";
import { mockCampusMenu } from "../Data/mockCampusMenu";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalStateProvider = ({ children }) => {

  const [vegMode, setVegMode] = useState(false);
  const [CartItems, setCartItems] = useState([]);
  const [campusShops, setcampusShops] = useState([]);
  const [campusMenu, setcampusMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [updatedCartWithDetails, setUpdatedCartWithDetails] = useState([]);

  useEffect(() => {
    const getVegData = async () => {
      try {
        const storedVegMode = await AsyncStorage.getItem('vegMode');
        if (storedVegMode !== null) setVegMode(JSON.parse(storedVegMode));
      } catch (error) {
        console.error('Error fetching data:', error);
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
    setcampusMenu(mockCampusMenu);
  }, [vegMode]);

  const updateQuantity = (id, newQuantity) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [id]: newQuantity
    }));
  };

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
    <GlobalStateContext.Provider value={{ campusShops, setcampusShops, quantity, setQuantity, campusMenu, setcampusMenu, CartItems, setCartItems, updateQuantity, updatedCartWithDetails, vegMode, setVegMode }}>
      {children}
    </GlobalStateContext.Provider>
  );
};