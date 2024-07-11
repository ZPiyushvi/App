import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Components/Colors'; // Adjust path as needed
import { API_BASE_URL, ADDOUTLET_ENDPOINT, USEROUTLETS_ENDPOINT  } from '../Constants/Constants';
// import { ADDOUTLET_ENDPOINT, USEROUTLETS_ENDPOINT, API_BASE_URL // Adjust paths/constants

export default function Like({ navigation }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [outlets, setOutlets] = useState([]);

    useEffect(() => {
        getUserOutlets();
    }, []);

    const getUserOutlets = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}:${USEROUTLETS_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setOutlets(data.data);
        } catch (error) {
            console.error('Error fetching user outlets:', error);
        }
    };

    const handleSubmit = async () => {
        if (!name || !location || !cuisine) {
            Alert.alert("All fields are required");
            return;
        }

        try {
            const token = await AsyncStorage.getItem("token");
            const OutletData = { name, location, cuisine, token };

            const response = await fetch(`${API_BASE_URL}:${ADDOUTLET_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(OutletData)
            });

            const data = await response.json();
            if (data.status === "ok") {
                Alert.alert("Outlet added successfully");
                getUserOutlets(); // Refresh the outlets list
            } else {
                Alert.alert(data.data);
            }
        } catch (error) {
            console.error("Error adding outlet:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Outlet Name"
                placeholderTextColor={Colors.dark.colors.textColor}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter Location"
                placeholderTextColor={Colors.dark.colors.textColor}
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter Cuisine"
                placeholderTextColor={Colors.dark.colors.textColor}
                value={cuisine}
                onChangeText={setCuisine}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
            <FlatList
                data={outlets}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.outletItem}>
                        <Text style={styles.outletText}>{item.name} - {item.location} - {item.cuisine}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    addButton: {
        backgroundColor: Colors.dark.colors.diffrentColorOrange,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark.colors.mainTextColor,
    },
    outletItem: {
        backgroundColor: 'grey',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    outletText: {
        color: 'white',
    },
});
