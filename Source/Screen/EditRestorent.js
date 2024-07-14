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
          <ManageItemsScreen
            selectedCategory={selectedCategory}
            editingOutlet={editingOutlet}
            setEditingOutlet={setEditingOutlet}
          />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default ManageCategoriesScreen;
