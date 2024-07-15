import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Colors from '../Components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADDMENU_ENDPOINT, API_BASE_URL, USERMENU_ENDPOINT, USEROUTLETS_ENDPOINT } from '../Constants/Constants';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { getUserOutlets } from '../Components/fetchYourOutlet';

const ManageCategoriesScreen = ({ navigation }) => {
  // const { outlet } = route.params;
  const [menu, setMenu] = useState([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  // const fetchOutlets = async () => {
  //   const outlets = await getUserOutlets();
  //   setMenu(outlets[0].menu)
  // };

  // useEffect(() => {
  //   fetchOutlets();
  // }, []);

  const handleSaveMenu = async () => {
    if (!menu) {
      console.log(menu)
      Alert.alert("All fields are required");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const dataToSend = { menu, token };
      console.log('Sending data:', dataToSend);

      const response = await fetch(`${API_BASE_URL}:${ADDMENU_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();
      if (data.status === "ok") {
        Alert.alert("Menu saved successfully");
        // navigation.goBack(); // Go back to the home screen
      } else {
        Alert.alert(data.data);
      }
    } catch (error) {
      console.error("Error saving menu:", error);
    }
  };

  const addCategory = () => {
    const categoryExists = menu.find(menuCategory => menuCategory.title === newCategoryTitle);

    if (!categoryExists) {
      const newCategory = {
        id: Date.now().toString(),
        title: newCategoryTitle,
        items: []
      };
      setMenu([...menu, newCategory]);
      setNewCategoryTitle('');
    } else {
      Alert.alert('Category exists');
    }
  };

  const addItem = () => {
    if (!selectedCategory) {
      Alert.alert("Please select a category");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      item: itemName,
      price: itemPrice,
      description: itemDescription,
      type: itemType,
      status: true,
    };

    const updatedMenu = menu.map(menuCategory => {
      if (menuCategory.id === selectedCategory.id) {
        return { ...menuCategory, items: [...menuCategory.items, newItem] };
      }
      return menuCategory;
    });

    setMenu(updatedMenu);
    setItemName('');
    setItemPrice('');
    setItemDescription('');
    setItemType('');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Manage Categories</Text>
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedCategory(item)}>
              <Text style={styles.category}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <TextInput
          style={styles.input}
          value={newCategoryTitle}
          onChangeText={setNewCategoryTitle}
          placeholder="Add new category"
        />
        <Button title="Add Category" onPress={addCategory} />

        {selectedCategory &&
          <View style={styles.container}>
            <Text style={styles.header}>Manage Items in {selectedCategory.title}</Text>
            <FlatList
              data={selectedCategory.items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.item}>{item.item}</Text>
                  <Text style={styles.item}>{item.price}</Text>
                  <Text style={styles.item}>{item.description}</Text>
                  <Text style={styles.item}>{item.status ? "Available" : "Unavailable"}</Text>
                </View>
              )}
            />
            <TextInput
              style={styles.input}
              value={itemName}
              onChangeText={setItemName}
              placeholder="Item name"
            />
            <TextInput
              style={styles.input}
              value={itemPrice}
              onChangeText={setItemPrice}
              placeholder="Item price"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={itemDescription}
              onChangeText={setItemDescription}
              placeholder="Item description"
            />
            <TextInput
              style={styles.input}
              value={itemType}
              onChangeText={setItemType}
              placeholder="Item Type"
            />
            <Button title="Add Item" onPress={addItem} />
          </View>
        }
        <TouchableOpacity onPress={handleSaveMenu} style={styles.saveButton}>
          <View style={styles.saveButtonContent}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  category: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 5
  },
  item: {
    fontSize: 16,
    marginBottom: 5
  },
  saveButton: {
    backgroundColor: Colors.dark.colors.diffrentColorOrange,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  saveButtonContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.colors.mainTextColor
  }
});

export default ManageCategoriesScreen;
