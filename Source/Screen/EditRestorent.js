import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Colors from '../Components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADDMENU_ENDPOINT, API_BASE_URL } from '../Constants/Constants';
import { getUserOutlets } from '../Components/fetchYourOutlet';

const ManageCategoriesScreen = ({ navigation }) => {
  const [editingMenu, setEditingMenu] = useState([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newItem, setNewItem] = useState({
    item: '',
    price: '',
    type: '',
    description: '',
  });

  const fetchOutlets = async () => {
    const outlets = await getUserOutlets();
    setEditingMenu(outlets[0].menu);
  };

  useEffect(() => {
    fetchOutlets();
  }, []);

  const handleSaveMenu = async () => {
    if (!editingMenu.length) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const dataToSend = { menu: editingMenu, token };
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
      } else {
        Alert.alert(data.data);
      }
    } catch (error) {
      console.error("Error saving menu:", error);
    }
  };

  const addCategory = () => {
    const categoryExists = editingMenu.find(menuCategory => menuCategory.title === newCategoryTitle);

    if (!categoryExists) {
      const newCategory = {
        id: Date.now().toString(),
        title: newCategoryTitle,
        items: []
      };
      setEditingMenu([...editingMenu, newCategory]);
      setNewCategoryTitle('');
    } else {
      Alert.alert('Category exists');
    }
  };
  const editCategory = (id, newTitle) => {
    console.log(id)
    const updatedMenu = editingMenu.map(menuCategory => {
      if (menuCategory._id === id) {
        return { ...menuCategory, title: newTitle };
      }
      return menuCategory;
    });
    setEditingMenu(updatedMenu);
  };

  const addItem = () => {
    if (!selectedCategory) {
      Alert.alert("Please select a category");
      return;
    }

    const newItemObj = {
      id: Date.now().toString(),
      ...newItem,
      status: true,
    };

    const updatedMenu = editingMenu.map(menuCategory => {
      if (menuCategory.title === selectedCategory.title) {
        return { ...menuCategory, items: [...menuCategory.items, newItemObj] };
      }
      return menuCategory;
    });

    setEditingMenu(updatedMenu);
    setNewItem({ item: '', price: '', type: '', description: '' });
  };

  const editItem = (item) => {
    setNewItem(item);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Manage Categories</Text>
        <FlatList
          data={editingMenu}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <TouchableOpacity onPress={() => setSelectedCategory(item)}>
                <Text style={styles.category}>{item.title}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={item.title}
                onChangeText={(text) => editCategory(item._id, text)}
                placeholder="Edit category title"
              />
            </View>
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
            {console.log('editingMenu')}

            {editingMenu.map(item => {
              console.log(item);
            })}

            <FlatList
              data={selectedCategory.items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.item}>{item.item}</Text>
                  <Text style={styles.item}>{item.price}</Text>
                  <Text style={styles.item}>{item.description}</Text>
                  <Text style={styles.item}>{item.status ? "Available" : "Unavailable"}</Text>
                  <Button title="Update Item" onPress={editItem} />
                </View>
              )}
            />
            <TextInput
              style={styles.input}
              value={newItem.item}
              onChangeText={(text) => setNewItem({ ...newItem, item: text })}
              placeholder="Item name"
            />
            <TextInput
              style={styles.input}
              value={newItem.price}
              onChangeText={(text) => setNewItem({ ...newItem, price: text })}
              placeholder="Item price"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={newItem.description}
              onChangeText={(text) => setNewItem({ ...newItem, description: text })}
              placeholder="Item description"
            />
            <TextInput
              style={styles.input}
              value={newItem.type}
              onChangeText={(text) => setNewItem({ ...newItem, type: text })}
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
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  category: {
    fontSize: 18,
    padding: 8,
    backgroundColor: Colors.lightGray,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 8,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: Colors.lightGray,
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
  },
  saveButtonContent: {
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ManageCategoriesScreen;