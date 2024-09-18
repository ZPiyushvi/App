// // npx nodemon app

const express = require("express");
const mongoose = require("mongoose");
const PORT = 5001;

const app = express();
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || "mongodb+srv://vipulpatil:e1UzKh7o5ewlOQ7U@cluster0.drh80rq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("error", err);
});

// Define Item Schema
const itemSchema = new mongoose.Schema({
    id: String,
    item: String,
    price: Number
});

// Define Category Schema
const categorySchema = new mongoose.Schema({
    category: String,
    id: String,
    items: [itemSchema] // Embedding Item Schema
});

// Create models
const Category = mongoose.model('Category', categorySchema);

// Get all categories
app.get('/getCategories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update or create category
app.post('/updateOrCreateCategory', async (req, res) => {
    const { category, id } = req.body;
    console.log(category, id)
    try {

        const user = jwt.verify(token, jwtSecret);

        const userId = user.contactinfo;

        let outlet = await OutletInfo.findOne({ userId });
        if (!outlet) {
            return res.status(404).send({ status: "error", data: "Outlet not found" });
        }

        let existingCategory = await Category.findOne({ id });

        if (existingCategory) {
            // Update category
            existingCategory.category = category;
            await existingCategory.save();
            res.status(200).json({ message: 'Category updated successfully' });
        } else {
            // Create new category
            const newCategory = new Category({ category, id, items: [] });
            await newCategory.save();
            res.status(201).json({ message: 'Category created successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update or create item within a category
app.post('/updateOrCreateItem', async (req, res) => {
    const { categoryId, item, price } = req.body;
    console.log(categoryId, item, price)
    try {
        let category = await Category.findOne({ id: categoryId });

        if (category) {
            let existingItem = category.items.find(i => i.item === item);

            if (existingItem) {
                // Update item
                existingItem.price = price;
                await category.save();
                res.status(200).json({ message: 'Item updated successfully' });
            } else {
                // Add new item
                category.items.push({ item, price });
                await category.save();
                res.status(201).json({ message: 'Item added successfully' });
            }
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { API_BASE_URL } from '../Constants/Constants';

const UpdateOrCreate = () => {
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}:5001/getCategories`);
      const data = await response.json();
      setCategories(data);
      console.log(data)
    } catch (error) {
      setMessage('Error fetching categories: ' + error.message);
    }
  };

  const handleCategorySubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}:5001/updateOrCreateCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, id: categoryId }),
      });
      const result = await response.json();
      setMessage(result.message);
      fetchCategories(); // Refresh categories list
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleItemSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}:5001/updateOrCreateItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId, item, price: parseFloat(price) }),
      });
      const result = await response.json();
      setMessage(result.message);
      fetchCategories(); // Refresh categories list
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <View className=' h-full w-full items-center justify-center content-center'>
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        placeholder="Category ID"
        value={categoryId}
        onChangeText={setCategoryId}
      />
      <Button title="Submit Category" onPress={handleCategorySubmit} />

      <TextInput
        placeholder="Item"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Button title="Submit Item" onPress={handleItemSubmit} />

      {message && <Text>{message}</Text>}

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.category}</Text>
            <FlatList
              data={item.items}
              keyExtractor={(subItem) => subItem.item}
              renderItem={({ item: subItem }) => (
                <Text>{subItem.item}: ${subItem.price}</Text>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default UpdateOrCreate;
