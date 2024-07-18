import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Colors from '../Components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADDMENU_ENDPOINT, API_BASE_URL } from '../Constants/Constants';
import { getUserOutlets } from '../Components/fetchYourOutlet';
import Details_Seller from '../Components/Details_Seller';

const ManageCategoriesScreen = ({ navigation }) => {
  const [editingMenu, setEditingMenu] = useState([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newItem, setNewItem] = useState({
    id: null,
    item: '',
    price: '',
    type: '',
    description: '',
    status: true,
    category: '',
    image: '',
    rating: '',
    ratingcount: '',
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
    const updatedMenu = editingMenu.map(menuCategory => {
      if (menuCategory._id === id) {
        return { ...menuCategory, title: newTitle };
      }
      return menuCategory;
    });
    setEditingMenu(updatedMenu);
  };

  const handleChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value })
    // setEditingOutlet({ ...editingOutlet, [field]: value });
};

  const addItem = () => {
    if (!selectedCategory) {
      Alert.alert("Please select a category");
      return;
    }

    const newItemObj = {
      id: newItem.id ? newItem.id : Date.now().toString(),
      item: newItem.item,
      price: newItem.price,
      type: newItem.type,
      description: newItem.description,
      status: newItem.status,
      category: newItem.category,
      image: newItem.image,
      // rating:  newItem.description,
      // ratingcount:  newItem.description,
    };

    const updatedMenu = editingMenu.map(menuCategory => {
      if (menuCategory.title === selectedCategory.title) {

        const existingItemIndex = menuCategory.items.findIndex(item => item.id == newItemObj.id);
        console.log(existingItemIndex, newItemObj)
        if (existingItemIndex == -1) {
          // Add new item
          menuCategory.items.push(newItemObj);

        } else {
          // Update existing item
          menuCategory.items[existingItemIndex] = newItemObj;
        }
      }
      return menuCategory;
    });

    setEditingMenu(updatedMenu);
    setNewItem({ id: null, item: '', price: '', type: '', description: '' });
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

            <FlatList
              data={selectedCategory.items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.item}>{item.item}</Text>
                  <Text style={styles.item}>{item.price}</Text>
                  <Text style={styles.item}>{item.description}</Text>
                  <Text style={styles.item}>{item.status ? "Available" : "Unavailable"}</Text>
                  <Button title="Edit" onPress={() => editItem(item)} />
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
            <TextInput
              style={styles.input}
              value={newItem.category}
              onChangeText={(text) => setNewItem({ ...newItem, category: text })}
              placeholder="Item category"
            />
            <TextInput
              style={styles.input}
              value={newItem.type}
              onChangeText={(text) => setNewItem({ ...newItem, type: text })}
              placeholder="Item Type"
            />
            <View className='mt-3 rounded-xl'>
              <View className='rounded-xl p-3 ' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                <View className=' flex-row items-center justify-between'>
                  <View className=' flex-row justify-between'>
                    <TouchableOpacity
                      onPress={() => handleChange('type', 'PureVeg')}
                      style={{ backgroundColor: newItem.type === 'PureVeg' ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.backGroundColor }}
                      className=' w-[35%] p-3 rounded-l-lg items-center'
                    >
                      <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Pure Veg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChange('type', 'Veg')}
                      style={{ backgroundColor: newItem.type === 'Veg' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.backGroundColor }}
                      className=' w-[30%] p-3 items-center'
                    >
                      <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Veg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChange('type', 'NonVeg')}
                      style={{ backgroundColor: newItem.type === 'NonVeg' ? Colors.dark.colors.diffrentColorRed : Colors.dark.colors.backGroundColor }}
                      className=' w-[35%] p-3 rounded-r-lg items-center'
                    >
                      <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Non Veg</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <TextInput
              style={styles.input}
              value={newItem.image}
              onChangeText={(text) => setNewItem({ ...newItem, image: text })}
              placeholder="Item image"
            />
            {/* <TextInput
              style={styles.input}
              value={newItem.type}
              onChangeText={(text) => setNewItem({ ...newItem, type: text })}
              placeholder="Item Type"
            /> */}

            <Button title={newItem.id ? "Update Item" : "Add Item"} onPress={addItem} />
          </View>
        }
        <TouchableOpacity onPress={handleSaveMenu} style={styles.saveButton}>
          <View style={styles.saveButtonContent}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* {console.log(editingMenu)} */}
      {editingMenu.map((item) => {
        console.log(item)
      })}

      <Details_Seller outlets={editingMenu} handleChange={handleChange} />
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
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 18,
    padding: 8,
    backgroundColor: Colors.lightGray,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 8,
    marginBottom: 16,
    flex: 1,
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
