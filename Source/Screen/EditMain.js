import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, ADDOUTLET_ENDPOINT } from '../Constants/Constants';

export default function EditScreen({ route, navigation }) {
    const { outlet } = route.params;
    const [editingOutlet, setEditingOutlet] = useState(outlet || { name: '', shopkeeperName: '', upiId: '' });

    const handleChange = (field, value) => {
        setEditingOutlet({ ...editingOutlet, [field]: value });
    };

    const handleSaveOutlet = async () => {
        if (!editingOutlet.name || !editingOutlet.shopkeeperName || !editingOutlet.upiId) {
            Alert.alert("All fields are required");
            return;
        }

        try {
            const token = await AsyncStorage.getItem("token");
            const outletData = { ...editingOutlet, token };

            const response = await fetch(`${API_BASE_URL}:${ADDOUTLET_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(outletData)
            });

            const data = await response.json();
            if (data.status === "ok") {
                Alert.alert("Outlet saved successfully");
                navigation.goBack(); // Go back to the home screen
            } else {
                Alert.alert(data.data);
            }
        } catch (error) {
            console.error("Error saving outlet:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Outlet Name"
                value={editingOutlet.name}
                onChangeText={(value) => handleChange('name', value)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter Shopkeeper Name"
                value={editingOutlet.shopkeeperName}
                onChangeText={(value) => handleChange('shopkeeperName', value)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter UPI ID"
                value={editingOutlet.upiId}
                onChangeText={(value) => handleChange('upiId', value)}
            />
            <TouchableOpacity onPress={handleSaveOutlet} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    textInput: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 },
    saveButton: { backgroundColor: 'blue', padding: 10, alignItems: 'center' },
    saveButtonText: { color: 'white', fontWeight: 'bold' }
});
