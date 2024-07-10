import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Colors from '../Components/Colors'; // Adjust path as needed
import { ADDOUTLET_ENDPOINT, API_BASE_URL } from '../Constants/Constants'; // Adjust paths/constants

export default function Like({ navigation }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [cuisine, setCuisine] = useState('');

    function handleSubmit() {
        // console.log("Contact Info:", contactinfo);

        if (!name) {
            Alert.alert("name info is required");
            return;
        }

        const OutletData = {
            name: String(name),
            location: String(location),
            cuisine: String(cuisine),
        };

        // console.log("User Data:", userData);

        if (name && location && cuisine) {
            // http://192.168.1.6:5001/register
            fetch(`http://192.168.1.6:5001/addoutlet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(OutletData)
            })
                .then(response => response.json())
                .then(data => {
                    // console.log("Response Data:", data);
                    if (data.status === "ok") {
                        Alert.alert("Added Successful");
                    } else {
                        Alert.alert(data.data);
                    }
                })
                .catch(error => console.log("Error:", error));
        } else {
            Alert.alert("Fill Required Details");
        }
    }

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
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.addButton}>
                <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
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
});


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Colors from "../Components/Colors";

// const categoryData = [
//   { 'type': 'Veg', 'color': '#00e676' },             
//   { 'type': 'NonVeg', 'color': '#ff0000' },          
//   { 'type': 'Stationery', 'color': 'blue' },     
//   { 'type': 'Beverage', 'color': '#4ABFF4' },        
//   { 'type': 'Hot_Cafe', 'color': '#923c01' },       
//   { 'type': 'Cold_Cafe', 'color': '#c37960' },       
//   { 'type': 'Snacks', 'color': '#ff611d' },        
//   { 'type': 'Hot_Meal', 'color': '#ffb80e' },   
//   { 'type': 'Cold_Dessert', 'color': '#FF4191' },  
//   { 'type': 'Cold_Beverage', 'color': '#4ABFF4' },  
//   { 'type': 'Fresh', 'color': 'green' },         
//   { 'type': 'Hot_Snacks', 'color': '#ff611d' },    
//   { 'type': 'Bakery_Dessert', 'color': '#FF4191' },  
//   { 'type': 'Bakery_Bread', 'color': '#efa14b' },   
// ];

// const Like = () => {
//   return (
//     <View className='h-full' style={styles.container}>
//       {categoryData.map((category, index) => (
//         <View key={index} style={[styles.categoryBox, { backgroundColor: category.color }]}>
//           <Text style={styles.categoryText}>{category.type}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.dark.colors.backGroundColor,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   categoryBox: {
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 5,
//     borderRadius: 10,
//   },
//   categoryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#ffffff', // White text color
//   },
// });

// export default Like;
