import { View, Text } from 'react-native'
import React from 'react'

export default function EditRestorent() {
  return (
    <View>
      <Text>EditRestorent</Text>
    </View>
  )
}

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL, USEROUTLETS_ENDPOINT } from '../Constants/Constants';
// import { useFocusEffect } from '@react-navigation/native';

// export default function HomeScreen({ navigation }) {
//     const [outlets, setOutlets] = useState([]);

//     useFocusEffect(
//         React.useCallback(() => {
//             getUserOutlets();
//         }, [])
//     );

//     const getUserOutlets = async () => {
//         try {
//             const token = await AsyncStorage.getItem("token");
//             const response = await fetch(`${API_BASE_URL}:${USEROUTLETS_ENDPOINT}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ token: token })
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }

//             const data = await response.json();
//             setOutlets(data.data);
//         } catch (error) {
//             console.error('Error fetching user outlets:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={() => navigation.navigate('EditMain', { outlet: null })} style={styles.addButton}>
//                 <Text style={styles.addButtonText}>ADD STORE</Text>
//             </TouchableOpacity>
//             <FlatList
//                 data={outlets}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.outletItem}>
// <View>
// <Text style={styles.outletText}>{item.name} - {item.shopkeeperName} - {item.upiId}</Text>
// <Text style={styles.outletText}>{item.image} - {item.details} - {item.location} - {item.featured.toString()}</Text>
//     </View>
//                         <TouchableOpacity onPress={() => navigation.navigate('EditMain', { outlet: item })} style={styles.editButton}>
//                             <Text style={styles.editButtonText}>EDIT</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20 },
//     addButton: { backgroundColor: 'blue', padding: 10, alignItems: 'center' },
//     addButtonText: { color: 'white', fontWeight: 'bold' },
//     outletItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: 'gray', flexDirection: 'row', justifyContent: 'space-between' },
//     outletText: { fontSize: 16 },
//     editButton: { backgroundColor: 'orange', padding: 5, marginLeft: 10 },
//     editButtonText: { color: 'white', fontWeight: 'bold' }
// });



// // import React, { useRef, useState, useEffect } from 'react';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { API_BASE_URL, ADDOUTLET_ENDPOINT, USEROUTLETS_ENDPOINT } from '../Constants/Constants';
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, StatusBar, Dimensions, FlatList, Alert } from 'react-native';
// // import DateTimePickerModal from 'react-native-modal-datetime-picker';
// // import moment from 'moment';
// // import Ionicons from "react-native-vector-icons/Ionicons";
// // import Colors from '../Components/Colors';

// // const menuTypes = ['Dessert', 'Beverage', 'Snack', 'Meal', 'Appetizer', 'Salad'];

// // const weekDays = [
// //     { label: 'Sunday', value: 'Sun' },
// //     { label: 'Monday', value: 'Mon' },
// //     { label: 'Tuesday', value: 'Tue' },
// //     { label: 'Wednesday', value: 'Wed' },
// //     { label: 'Thursday', value: 'Thu' },
// //     { label: 'Friday', value: 'Fri' },
// //     { label: 'Saturday', value: 'Sat' },
// //     { label: 'None', value: 'None' },
// // ];

// // const EditStoreDetails = () => {
// //     const [storeDetails, setStoreDetails] = useState({
// //         name: 'Amul Store',
// //         shopkeeperName: 'Anil Mehta',
// //         upiId: 'amulstore@upi',
// //         featured: false,
// //         type: 'Veg',
// //         menuType: ['Dessert'],
// //         location: 'Emiet Hostel',
// //         locationDetailed: 'Emiet Hostel',
// //         rating: '4.0',
// //         ratingCount: '300',
// //         image: 'https://www.iitgn.ac.in/student/lifeoncampus/facilities/images/thumb/amulstore.jpg',
// //         details: 'The Amul Store at the campus is a one-stop shop for a variety of dairy products including milk, cheese, ice cream, and other popular Amul products.',
//         // openingTime: '10:00 am',
//         // closingTime: '10:00 pm',
//         // offDays: 'None',
//         // leaveDay: 'None'
// //     });

// //     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
// //     const [timePickerKey, setTimePickerKey] = useState(null);
// //     const [isDateSelectorVisible, setDateSelectorVisibility] = useState(false);

// //     const handleChange = (key, value) => {
// //         setStoreDetails(prevState => ({
// //             ...prevState,
// //             [key]: value
// //         }));
// //     };

// //     const handleMenuTypeToggle = (type) => {
// //         setStoreDetails(prevState => {
// //             const updatedMenuType = prevState.menuType.includes(type)
// //                 ? prevState.menuType.filter(item => item !== type)
// //                 : [...prevState.menuType, type];
// //             return { ...prevState, menuType: updatedMenuType };
// //         });
// //     };

// //     const showDatePicker = (key) => {
// //         setTimePickerKey(key);
// //         setDatePickerVisibility(true);
// //     };

// //     const showDateSelector = () => {
// //         setDateSelectorVisibility(true);
// //     };

// //     const hideDatePicker = () => {
// //         setDatePickerVisibility(false);
// //         setTimePickerKey(null);
// //     };

// //     const hideDateSelector = () => {
// //         setDateSelectorVisibility(false);
// //     };

// //     const handleConfirm = (date) => {
// //         const formattedTime = moment(date).format('hh:mm a');
// //         if (timePickerKey) {
// //             handleChange(timePickerKey, formattedTime);
// //         }
// //         hideDatePicker();
// //     };

// //     const handleDateConfirm = (date) => {
// //         const formattedDate = moment(date).format('MMMM D, YYYY');
// //         handleChange('leaveDay', formattedDate);
// //         hideDateSelector();
// //     };

// //     const [storeDetailsOffDays, setStoreDetailsOffDays] = useState({
// //         offDays: [],
// //     });
// //     const [openDropdown, setOpenDropdown] = useState(false);

// //     const toggleDropdown = () => {
// //         setOpenDropdown(prevState => !prevState);
// //     };

// //     const handleOffDaysToggle = (day) => {
// //         setStoreDetailsOffDays(prevState => {
// //             const updatedOffDays = prevState.offDays.includes(day)
// //                 ? prevState.offDays.filter(item => item !== day)
// //                 : [...prevState.offDays.filter(item => item !== 'None'), day];
// //             if (day === 'None') return { ...prevState, offDays: ['None'] };
// //             return { ...prevState, offDays: updatedOffDays };
// //         });
// //     };

// //     const renderDropdownItem = ({ item }) => (
// //         <TouchableOpacity
// //             style={{
// //                 padding: 10,
// //                 flexDirection: 'row',
// //                 justifyContent: 'space-between',
// //                 alignItems: 'center',
// //                 overflow: 'hidden',
// //                 backgroundColor: storeDetailsOffDays.offDays.includes(item.value) ? Colors.dark.colors.backGroundColor : 'transparent',
// //                 // borderBottomWidth: 1,
// //                 // borderBottomColor: '#ccc',
// //             }}
// //             onPress={() => handleOffDaysToggle(item.value)}
// //         >
// //             <Text
// //                 className='font-black overflow-hidden flex-row justify-between text-base rounded-md'
// //                 style={{ color: storeDetailsOffDays.offDays.includes(item.value) ? Colors.dark.colors.mainTextColor : Colors.dark.colors.textColor }}
// //             >{item.label}
// //             </Text>
// //             {storeDetailsOffDays.offDays.includes(item.value) && (
// //                 <Ionicons name="checkmark-outline" size={20} color={Colors.dark.colors.diffrentColorGreen} />
// //             )}
// //         </TouchableOpacity>
// //     );

// //     const scrollViewRef = useRef(null);

// //     const handleDropdownPress = () => {
// //         toggleDropdown();
// //         setTimeout(() => {
// //             if (scrollViewRef.current) {
// //                 scrollViewRef.current.scrollTo({ y: 1200, animated: true });
// //             }
// //         }, 10); // Adjust the timeout as needed
// //     };

// //     const inputRefs = useRef({});
// //     const [focusedInput, setFocusedInput] = useState(null);

// //     const focusInput = (fieldName) => {
// //         if (inputRefs.current[fieldName]) {
// //             inputRefs.current[fieldName].focus();
// //         }
// //     };

// //     const handleBlur = (fieldName) => {
// //         setFocusedInput(null);
// //     };

// //     const handleFocus = (fieldName) => {
// //         setFocusedInput(fieldName);
// //     };

// //     return (
// //         // <View className=' px-3 w-full justify-between' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
// //         // <ScrollView className='px-3 h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
// //         //   <Text className=' text-xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>Store Name</Text>
// //         //   <TextInput
// //         //     style={styles.input}
// //         //     value={storeDetails.name}
// //         //     onChangeText={(value) => handleChange('name', value)}
// //         //   />
// //         // </ScrollView>

//         // <KeyboardAvoidingView
//         //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         //     style={{ flex: 1 }}
//         // >
//         //     <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />
//         //     <View className='px-3 w-full justify-between' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
//         //         <View className='flex-row items-center pb-4'>
//         //             <TouchableOpacity onPress={() => navigation.goBack()}>
//         //                 <Ionicons name="arrow-back-outline" size={24} color={Colors.dark.colors.mainTextColor} />
//         //             </TouchableOpacity>
//         //         </View>

//         //         <View className='w-full rounded-2xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.25 }}>
//         //             <View className='h-3/5 flex-row items-center'>
//         //                 <View className='w-16 h-16 mx-3 pt-1 rounded-full items-center justify-center' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerpleBG }}>
//         //                     <Text className='text-4xl font-black' style={{ color: Colors.dark.colors.diffrentColorPerple }}>U</Text>
//         //                 </View>
//         //                 <View>
//         //                     <Text numberOfLines={1} ellipsizeMode='tail' className='text-xl font-black' style={{ color: Colors.dark.colors.mainTextColor }}>UserName</Text>
//         //                     <Text numberOfLines={1} ellipsizeMode='tail' className='font-bold text-lg' style={{ color: Colors.dark.colors.textColor }}>Contact details</Text>
//         //                     <View className='-mt-1 flex-row items-center'>
//         //                         <Text className='font-medium text-base underline' style={{ color: Colors.dark.colors.diffrentColorOrange }}>View activity</Text>
//         //                         <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} />
//         //                     </View>
//         //                 </View>
//         //             </View>
//         //             <View className=' h-2/5 flex-row p-3 items-center justify-between bg-black'>
//         //                 <View className='flex-row items-center'>
//         //                     <View className=' p-2 rounded-full' style={{ backgroundColor: 'rgba(244,230,83,0.3)' }}>
//         //                         {/* <LinearGradient className=' p-1 rounded-full' colors={['#D79C08', '#F4E653', '#D79C08']}> */}
//         //                         <Ionicons name='ribbon' size={24} color={'black'} />
//         //                         {/* </LinearGradient> */}
//         //                     </View>

//         //                     {/* <LinearGradient className=' p-1 rounded-full' colors={['#D79C08', '#F4E653', '#D79C08']}> */}
//         //                     <Text className='text-xl font-black text-[#D79C08]'>  Know Us</Text>
//         //                     {/* </LinearGradient> */}
//         //                 </View>
//         //                 <Ionicons name='chevron-forward' size={24} color={'#D79C08'} />
//         //             </View>
//         //         </View>
//         //     </View>

//         //     <ScrollView
//         //         ref={scrollViewRef}
//         //         className='px-3 h-full w-full'
//         //         style={{ backgroundColor: Colors.dark.colors.backGroundColor }}
//         //         keyboardShouldPersistTaps='handled'
//         //     >
//                 // <View className='mt-3 px-2 flex-row justify-center'>
//                 //     <View className='w-1/2 rounded-2xl overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15 }}>
//                 //         <View className='p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
//                 //             <Ionicons name='heart-outline' size={24} color={Colors.dark.colors.mainTextColor} />
//                 //         </View>
//                 //         <Text numberOfLines={1} ellipsizeMode='tail' className='absolute left-6 bottom-4 font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Favourites</Text>
//                 //     </View>

//                 //     <View className='w-1/2 rounded-2xl overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15 }}>
//                 //         <View className='p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
//                 //             <Ionicons name='bag-handle-outline' size={24} color={Colors.dark.colors.mainTextColor} />
//                 //         </View>
//                 //         <Text className='absolute left-6 bottom-4 font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Orders</Text>
//                 //     </View>
//                 // </View>

//                 // <View className='rounded-xl mt-3 w-full' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
//                 //     <View className='p-3 items-center flex-row justify-between'>
//                 //         <View className='flex-row items-center'>
//                 //             <Text className='font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Featured</Text>
//                 //         </View>
//                 //         <TouchableOpacity onPress={() => handleChange('featured', !storeDetails.featured)}>
//                 //             <Ionicons
//                 //                 name='toggle'
//                 //                 size={38}
//                 //                 style={{ transform: [{ rotate: storeDetails.featured ? '0deg' : '180deg' }] }}
//                 //                 color={storeDetails.featured ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.mainTextColor}
//                 //             />
//                 //         </TouchableOpacity>
//                 //     </View>
//                 // </View>

//                 // <View className='mt-3 rounded-xl'>
//                 //     <View className='rounded-xl p-3 ' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
//                 //         <View className=' flex-row items-center justify-between'>
//                 //             <View className=' flex-row justify-between'>
//                 //                 <TouchableOpacity
//                 //                     onPress={() => handleChange('type', 'Veg')}
//                 //                     style={{ backgroundColor: storeDetails.type !== 'NonVeg' ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.backGroundColor }}
//                 //                     className=' w-[35%] p-3 rounded-l-lg items-center'
//                 //                 >
//                 //                     <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Pure Veg</Text>
//                 //                 </TouchableOpacity>
//                 //                 <TouchableOpacity
//                 //                     onPress={() => handleChange('type', 'Both')}
//                 //                     style={{ backgroundColor: storeDetails.type === 'Both' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.backGroundColor }}
//                 //                     className=' w-[30%] p-3 items-center'
//                 //                 >
//                 //                     <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Both</Text>
//                 //                 </TouchableOpacity>
//                 //                 <TouchableOpacity
//                 //                     onPress={() => handleChange('type', 'NonVeg')}
//                 //                     style={{ backgroundColor: storeDetails.type !== 'Veg' ? Colors.dark.colors.diffrentColorRed : Colors.dark.colors.backGroundColor }}
//                 //                     className=' w-[35%] p-3 rounded-r-lg items-center'
//                 //                 >
//                 //                     <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Non Veg</Text>
//                 //                 </TouchableOpacity>
//                 //             </View>
//                 //         </View>
//                 //     </View>
//                 // </View>

//                 // <View className='mt-3 rounded-xl'>
//                 //     <View className='rounded-xl p-3' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
//                 //         <View className='items-center flex-row mb-3'>
//                 //             <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
//                 //             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> Shopkeeper Information</Text>
//                 //         </View>
//                 //         <View className='my-2 flex-row items-center justify-between'>
//                 //             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Shopkeeper Name</Text>
//                 //             <View className='flex-row'>
//                 //                 <TextInput
//                 //                     ref={ref => inputRefs.current['shopkeeperName'] = ref}
//                 //                     style={{ color: Colors.dark.colors.mainTextColor }}
//                 //                     className='font-black text-base underline mr-2'
//                 //                     value={storeDetails.shopkeeperName}
//                 //                     onChangeText={(value) => handleChange('shopkeeperName', value)}
//                 //                     onFocus={() => handleFocus('shopkeeperName')}
//                 //                     onBlur={() => handleBlur('shopkeeperName')}
//                 //                 />

//                 //                 {focusedInput === 'shopkeeperName' ? (
//                 //                     <TouchableOpacity onPress={() => inputRefs.current['shopkeeperName'].blur()}>
//                 //                         <Ionicons name="checkmark-done" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                     </TouchableOpacity>
//                 //                 ) : (
//                 //                     <TouchableOpacity onPress={() => focusInput('shopkeeperName')}>
//                 //                         <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                     </TouchableOpacity>
//                 //                 )}
//                 //             </View>
//                 //         </View>
//                 //         <View className='my-2 flex-row items-center justify-between'>
//                 //             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>UPI ID</Text>
//                 //             <View className='flex-row'>
//                 //                 <TextInput
//                 //                     ref={ref => inputRefs.current['upiId'] = ref}
//                 //                     style={{ color: Colors.dark.colors.mainTextColor }}
//                 //                     className='font-black text-base underline mr-2'
//                 //                     value={storeDetails.upiId}
//                 //                     onChangeText={(value) => handleChange('upiId', value)}
//                 //                     onFocus={() => handleFocus('upiId')}
//                 //                     onBlur={() => handleBlur('upiId')}
//                 //                 />

//                 //                 {focusedInput === 'upiId' ? (
//                 //                     <TouchableOpacity onPress={() => inputRefs.current['upiId'].blur()}>
//                 //                         <Ionicons name="checkmark-done" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                     </TouchableOpacity>
//                 //                 ) : (
//                 //                     <TouchableOpacity onPress={() => focusInput('upiId')}>
//                 //                         <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                     </TouchableOpacity>
//                 //                 )}
//                 //             </View>
//                 //         </View>
//                 //         {/* <View className='flex-row'>
//                 //         <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Shopkeeper Name</Text>
//                 //         <View className='flex-row'>
//                 //             <TextInput
//                 //                 ref={upiIdInputRef}
//                 //                 style={{ color: Colors.dark.colors.mainTextColor }}
//                 //                 className='font-black text-base underline mr-2'
//                 //                 value={storeDetails.upiId}
//                 //                 onChangeText={(value) => handleChange('upiId', value)}
//                 //             />
//                 //             <TouchableOpacity onPress={() => upiIdInputRef.current.focus()}>
//                 //                 <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //             </TouchableOpacity>
//                 //             </View>
//                 //         </View> */}
//                 //         {/* <View className='my-2 flex-row items-center justify-between'>
//                 //             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Store Name</Text>
//                 //             <View className='flex-row'>
//                 //                 <TextInput
//                 //                     style={{ color: Colors.dark.colors.mainTextColor }}
//                 //                     className='font-black text-base underline mr-2'
//                 //                     value={storeDetails.name}
//                 //                     onChangeText={(value) => handleChange('name', value)}
//                 //                 />
//                 //                 <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //             </View>
//                 //         </View> */}
//                 //     </View>
//                 // </View>

//                 // <View className='mt-3 rounded-xl'>
//                 //     <View className='rounded-xl p-3' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
//                 //         <View className='items-center flex-row mb-3'>
//                 //             <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
//                 //             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> Store Information</Text>
//                 //         </View>

//                 //         <View className='my-2 flex-row items-center justify-between'>
//                 //             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Store Name</Text>
//                 //             <View className='flex-row'>
//                 //                 <TextInput
//                 //                     ref={ref => inputRefs.current['name'] = ref}
//                 //                     style={{ color: Colors.dark.colors.mainTextColor }}
//                 //                     className='font-black text-base underline mr-2'
//                 //                     value={storeDetails.name}
//                 //                     onChangeText={(value) => handleChange('name', value)}
//                 //                     onFocus={() => handleFocus('name')}
//                 //                     onBlur={() => handleBlur('name')}
//                 //                 />

//                 //                 {focusedInput === 'name' ? (
//                 //                     <TouchableOpacity onPress={() => inputRefs.current['name'].blur()}>
//                 //                         <Ionicons name="checkmark-done" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                     </TouchableOpacity>
//                 //                 ) : (
//                 //                     <TouchableOpacity onPress={() => focusInput('name')}>
//                 //                         <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                     </TouchableOpacity>
//                 //                 )}
//                 //             </View>
//                 //         </View>
//                 //         <View className='my-2 flex-row items-center justify-between'>
//                 //             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Location</Text>
//                 //             <View className='flex-row'>
//                 //                 <TextInput
//                 //                     ref={ref => inputRefs.current['location'] = ref}
//                 //                     style={{ color: Colors.dark.colors.mainTextColor }}
//                 //                     className='font-black text-base underline mr-2'
//                 //                     value={storeDetails.location}
//                 //                     onChangeText={(value) => handleChange('location', value)}
//                 //                     onFocus={() => handleFocus('name')}
//                 //                     onBlur={() => handleBlur('name')}
//                 //                 />

//                 //                 {focusedInput === 'name' ? (
//                 //                     <TouchableOpacity onPress={() => inputRefs.current['name'].blur()}>
//                 //                         <Ionicons name="checkmark-done" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                     </TouchableOpacity>
//                 //                 ) : (
//                 //                     <TouchableOpacity onPress={() => focusInput('name')}>
//                 //                         <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                     </TouchableOpacity>
//                 //                 )}
//                 //             </View>
//                 //         </View>

//                 //         <View className='my-2'>
//                 //             <View className='flex-row justify-between'>
//                 //                 <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base mb-2' style={{ color: Colors.dark.colors.mainTextColor }}>
//                 //                     Additional Details
//                 //                 </Text>
//                 //                 {focusedInput === 'details' ? (
//                 //                 <TouchableOpacity onPress={() => inputRefs.current['details'].blur()}>
//                 //                     <Ionicons name="checkmark-done" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                 </TouchableOpacity>
//                 //             ) : (
//                 //                 <TouchableOpacity onPress={() => focusInput('details')}>
//                 //                     <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                 </TouchableOpacity>
//                 //             )}
//                 //             </View>
//                 //             <TextInput
//                 //                 ref={ref => inputRefs.current['details'] = ref}
//                 //                 style={{ color: Colors.dark.colors.mainTextColor, flex: 1 }}
//                 //                 className='font-black text-base underline mr-2'
//                 //                 value={storeDetails.details}
//                 //                 onChangeText={(value) => handleChange('details', value)}
//                 //                 multiline={true}
//                 //                 numberOfLines={4}
//                 //                 onFocus={() => handleFocus('details')}
//                 //                 onBlur={() => handleBlur('details')}
//                 //             />

                            
//                 //         </View>
//                 //         <View className='my-2'>
//                 //             <View className='flex-row justify-between'>
//                 //                 <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base ' style={{ color: Colors.dark.colors.mainTextColor }}>
//                 //                     Image
//                 //                 </Text>
//                 //                 {focusedInput === 'image' ? (
//                 //                 <TouchableOpacity onPress={() => inputRefs.current['image'].blur()}>
//                 //                     <Ionicons name="checkmark-done" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                 </TouchableOpacity>
//                 //             ) : (
//                 //                 <TouchableOpacity onPress={() => focusInput('image')}>
//                 //                     <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
//                 //                 </TouchableOpacity>
//                 //             )}
//                 //             </View>
//                 //             <TextInput
//                 //                 ref={ref => inputRefs.current['image'] = ref}
//                 //                 style={{ color: Colors.dark.colors.mainTextColor, flex: 1 }}
//                 //                 className='font-black text-base underline mr-2'
//                 //                 value={storeDetails.image}
//                 //                 onChangeText={(value) => handleChange('image', value)}
//                 //                 multiline={true}
//                 //             // numberOfLines={3}
//                 //             onFocus={() => handleFocus('image')}
//                 //             onBlur={() => handleBlur('image')}
//                 //         />

                        
//                 //         </View>
//                 //     </View>
//                 // </View>

// //                 <View className='my-3 rounded-xl'>
// //                     <View className='rounded-xl p-3' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
// //                         <View className='items-center flex-row mb-3'>
// //                             <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
// //                             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> Operating Period</Text>
// //                         </View>

// //                         <View className='my-1 flex-row items-center justify-between'>
// //                             <View className='w-[43%]'>
// //                                 <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-base underline mb-1'>Opening Time</Text>
// //                                 <TouchableOpacity onPress={() => showDatePicker('openingTime')}>
// //                                     <TextInput
// //                                         className='font-black text-base rounded-md p-2'
// //                                         style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
// //                                         value={storeDetails.openingTime}
// //                                         editable={false}
// //                                     />
// //                                 </TouchableOpacity>
// //                             </View>
// //                             <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black top-3 text-xl'>to</Text>
// //                             <View className='w-[43%]'>
// //                                 <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-base underline mb-1'>Closing Time</Text>
// //                                 <TouchableOpacity onPress={() => showDatePicker('closingTime')}>
// //                                     <TextInput
// //                                         className='font-black text-base rounded-md p-2'
// //                                         style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
// //                                         value={storeDetails.closingTime}
// //                                         editable={false}
// //                                     />
// //                                 </TouchableOpacity>
// //                             </View>
// //                         </View>

// //                         <View className='my-1 flex-1'>
// //                             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base mb-1' style={{ color: Colors.dark.colors.mainTextColor }}>Leave Days</Text>
// //                             <TouchableOpacity onPress={showDateSelector}>
// //                                 <TextInput
// //                                     className='font-black text-base rounded-md p-2'
// //                                     style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
// //                                     value={storeDetails.leaveDay}
// //                                     editable={false}
// //                                 />
// //                             </TouchableOpacity>
// //                         </View>

// //                         <View className='my-1 flex-1'>
// //                             <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base mb-1' style={{ color: Colors.dark.colors.mainTextColor }}>Off Days</Text>
// //                             <TouchableOpacity
// //                                 className='p-3 font-black flex-row items-center justify-between text-base rounded-md'
// //                                 style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
// //                                 onPress={handleDropdownPress}
// //                             >
// //                                 <Text
// //                                     className='font-black flex-row justify-between text-base rounded-md'
// //                                     style={{ color: Colors.dark.colors.mainTextColor }}
// //                                 >
// //                                     {storeDetailsOffDays.offDays.length > 0 ? storeDetailsOffDays.offDays.map(day => weekDays.find(wd => wd.value === day).value).join(', ') : 'Select Off Days'}
// //                                 </Text>
// //                                 <Ionicons
// //                                     name={openDropdown ? "close" : "chevron-down"}
// //                                     size={20}
// //                                     color={Colors.dark.colors.mainTextColor}
// //                                 />
// //                             </TouchableOpacity>
// //                             {openDropdown && (
// //                                 <View className='overflow-hidden font-black mt-2 text-base rounded-md' style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}>
// //                                     {weekDays.map((item) => (
// //                                         <TouchableOpacity
// //                                             style={{
// //                                                 padding: 10,
// //                                                 flexDirection: 'row',
// //                                                 justifyContent: 'space-between',
// //                                                 alignItems: 'center',
// //                                                 overflow: 'hidden',
// //                                                 backgroundColor: storeDetailsOffDays.offDays.includes(item.value) ? Colors.dark.colors.backGroundColor : 'transparent',
// //                                                 // borderBottomWidth: 1,
// //                                                 // borderBottomColor: '#ccc',
// //                                             }}

// //                                             onPress={() => {
// //                                                 console.log(item.value);
// //                                                 handleOffDaysToggle(item.value);
// //                                                 if (item.value === 'None') {
// //                                                     toggleDropdown(); // If not want to close on None
// //                                                 }
// //                                             }}
// //                                         >
// //                                             <Text
// //                                                 className='font-black overflow-hidden flex-row justify-between text-base rounded-md'
// //                                                 style={{ color: storeDetailsOffDays.offDays.includes(item.value) ? Colors.dark.colors.mainTextColor : Colors.dark.colors.textColor }}
// //                                             >{item.label}
// //                                                 {/* {console.log(item.label)} */}
// //                                             </Text>
// //                                             {storeDetailsOffDays.offDays.includes(item.value) && (
// //                                                 <Ionicons name="checkmark-outline" size={20} color={Colors.dark.colors.diffrentColorGreen} />
// //                                             )}
// //                                         </TouchableOpacity>
// //                                     ))}
// //                                     <TouchableOpacity
// //                                         style={styles.doneButton}
// //                                         onPress={toggleDropdown}
// //                                     >
// //                                         <Text style={styles.doneButtonText}>Done</Text>
// //                                     </TouchableOpacity>
// //                                     {/* <TouchableOpacity
// //                                         style={styles.doneButton}
// //                                         onPress={toggleDropdown}
// //                                     >
// //                                         <Text style={styles.doneButtonText}>Done</Text>
// //                                     </TouchableOpacity> */}
// //                                 </View>
// //                             )}
// //                         </View>
// //                     </View>
// //                 </View>

// //                 <DateTimePickerModal
// //                     isVisible={isDatePickerVisible}
// //                     mode="time"
// //                     onConfirm={handleConfirm}
// //                     onCancel={hideDatePicker}
// //                 />

// //                 <DateTimePickerModal
// //                     isVisible={isDateSelectorVisible}
// //                     mode="date"
// //                     onConfirm={handleDateConfirm}
// //                     onCancel={hideDateSelector}
// //                 />
// //             </ScrollView>
// //         </KeyboardAvoidingView>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         padding: 20,
// //     },
// //     label: {
// //         fontSize: 16,
// //         marginVertical: 10,
// //     },
// //     input: {
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         padding: 10,
// //         borderRadius: 5,
// //     },
// //     buttonGroup: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //     },
// //     button: {
// //         flex: 1,
// //         margin: 5,
// //         padding: 10,
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         alignItems: 'center',
// //     },
// //     buttonSelected: {
// //         backgroundColor: 'orange',
// //     },
// //     buttonText: {
// //         color: '#fff',
// //     },
// //     grid: {
// //         flexDirection: 'row',
// //         flexWrap: 'wrap',
// //     },
// //     gridItem: {
// //         width: '30%',
// //         margin: 5,
// //         padding: 10,
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         alignItems: 'center',
// //     },
// //     gridItemSelected: {
// //         backgroundColor: 'orange',
// //     },
// //     gridItemText: {
// //         color: '#fff',
// //     },

// //     container: {
// //         padding: 20,
// //     },
// //     label: {
// //         fontSize: 16,
// //         marginBottom: 10,
// //     },
// //     dropdownContainer: {
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         overflow: 'hidden',
// //     },
// //     dropdownHeader: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         padding: 10,
// //     },
// //     dropdownHeaderText: {
// //         fontSize: 16,
// //     },
// //     dropdownList: {
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         marginTop: 5,
// //     },
// //     dropdownItem: {
// //         padding: 10,
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         borderBottomWidth: 1,
// //         borderBottomColor: '#ccc',
// //     },
// //     dropdownItemText: {
// //         fontSize: 16,
// //     },
//     // doneButton: {
//     //     padding: 10,
//     //     backgroundColor: '#007BFF',
//     //     alignItems: 'center',
//     //     justifyContent: 'center',
//     //     borderRadius: 5,
//     //     margin: 10,
//     // },
//     // doneButtonText: {
//     //     color: '#fff',
//     //     fontSize: 16,
//     // },
// // });

// // export default EditStoreDetails;


