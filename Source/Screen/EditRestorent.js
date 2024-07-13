import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const EditRestorent = ({ navigation }) => {
    const [categoryTitle, setCategoryTitle] = useState('');
    const [items, setItems] = useState([{ id: '', item: '', price: '' }]);

    const addItem = () => {
        setItems([...items, { id: '', item: '', price: '' }]);
    };

    const handleSave = () => {
        // Handle save to the backend here
        // e.g., send data to your backend API endpoint
    };

    return (
        <View>
            <Text>Edit Restaurant</Text>
            <TextInput
                placeholder="Category Title"
                value={categoryTitle}
                onChangeText={setCategoryTitle}
            />
            {items.map((item, index) => (
                <View key={index}>
                    <TextInput
                        placeholder="Item ID"
                        value={item.id}
                        onChangeText={text => {
                            const newItems = [...items];
                            newItems[index].id = text;
                            setItems(newItems);
                        }}
                    />
                    <TextInput
                        placeholder="Item Name"
                        value={item.item}
                        onChangeText={text => {
                            const newItems = [...items];
                            newItems[index].item = text;
                            setItems(newItems);
                        }}
                    />
                    <TextInput
                        placeholder="Item Price"
                        value={item.price}
                        onChangeText={text => {
                            const newItems = [...items];
                            newItems[index].price = text;
                            setItems(newItems);
                        }}
                    />
                </View>
            ))}
            <Button title="Add Item" onPress={addItem} />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

export default EditRestorent;
