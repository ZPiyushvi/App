import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import ManageItemsScreen from '../Components/ManageItemsScreen';
import { ScrollView } from 'react-native';

const ManageCategoriesScreen = ({ navigation, route }) => {
  const { editingOutlet, setEditingOutlet } = route.params;

  const [newCategoryTitle, setNewCategoryTitle] = useState('');

  const addCategory = () => {
    const categoryExists = editingOutlet.menu.find(menuCategory => menuCategory.title === newCategoryTitle);

    if (!categoryExists) {
      const newCategory = {
        id: Date.now().toString(),
        title: newCategoryTitle,
        items: []
      };
      setEditingOutlet({ ...editingOutlet, menu: [...editingOutlet.menu, newCategory] });
      setNewCategoryTitle('');
    } else {
      Alert.alert('Category exists');
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      item: itemName,
      price: itemPrice,
      description: itemDescription,
      type: itemType,
      stutus: true,
    };

    const updatedMenu = editingOutlet.menu.map((menuCategory) => {
      if (menuCategory.id === selectedCategory.id) {
        return {
          ...menuCategory,
          items: [...menuCategory.items, newItem],
        };
      }
      return menuCategory;
    });

    setEditingOutlet({ ...editingOutlet, menu: updatedMenu });
    setItemName('');
    setItemPrice('');
    setItemDescription('');
    // setItemStutus(true);
    // setItemType('')
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Manage Categories</Text>
        {console.log(editingOutlet)}
        <FlatList
          data={editingOutlet.menu}
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
                  {/* <Text style={styles.item}>{item.description}</Text> */}
                  <Text style={styles.item}>{item.description}</Text>
                  <Text style={styles.item}>{item.stutus}</Text>
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
            {/* <TextInput
              style={styles.input}
              value={itemStutus}
              onChangeText={setItemStutus}
              placeholder="Item Status"
          /> */}
            <Button title="Add Item" onPress={addItem} />
          </View>
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  category: {
    fontSize: 18,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default ManageCategoriesScreen;
