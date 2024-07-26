import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView, Keyboard, Dimensions, Image } from 'react-native';
import Colors from '../Components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADDMENU_ENDPOINT, API_BASE_URL } from '../Constants/Constants';
import { getUserOutlets } from '../Components/fetchYourOutlet';
import Details_Seller from '../Components/Details_Seller';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import TextStyles from '../Style/TextStyles';
import TruncatedTextComponent from '../Components/TruncatedTextComponent';
import { StatusBar } from 'react-native';
import ToastNotification from '../Components/ToastNotification';

const menuTypes = ['Beverage', 'Dessert', 'General', 'Coffee', 'Printing', 'Indian', 'Grocery', 'Healthy Food', 'Fast Food', 'Stationery', 'Cuisine', 'Laundry Services', 'Bakery'];

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

  const [showToast, setShowToast] = useState(false);

  const handleSaveMenu = async () => {
    if (!editingMenu) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      // console.log(editingMenu)
      // const updatedMenuType = { ...prevState, category: category.join('_') };

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
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 2500); // 300ms slide in + 3000ms delay + 300ms slide out
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
      // category: newItem.category.join('_'),
      category: newItem.category,
      image: newItem.image,
      rating: newItem.rating || 3,
      ratingcount: newItem.ratingcount || 7,
    };

    console.log('category', newItemObj.category)

    const updatedMenu = editingMenu.map(menuCategory => {
      if (menuCategory.title === selectedCategory.title) {

        const existingItemIndex = menuCategory.items.findIndex(item => item.id == newItemObj.id);
        // console.log(existingItemIndex, newItemObj)
        if (existingItemIndex == -1) {
          // Add new item
          menuCategory.items.push({
            ...newItemObj,
            rating: 3,
            ratingcount: 7
          });

        } else {
          // Update existing item
          menuCategory.items[existingItemIndex] = newItemObj;
        }
      }
      return menuCategory;
    });

    setEditingMenu(updatedMenu);
    setNewItem({ id: null, item: '', price: '', type: '', description: '', rating: '', ratingcount: '' });
  };

  const editItem = (item) => {
    setNewItem(item);
  };




  const scrollViewRef = useRef(null);

  const handleDropdownPress = () => {
    toggleDropdown();
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 1200, animated: true });
      }
    }, 10); // Adjust the timeout as needed
  };

  const handleCatigoryDropdownPress = () => {
    toggleCatigoryDropdown();
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 1200, animated: true });
      }
    }, 10); // Adjust the timeout as needed
  };

  const [openCatigoryDropdown, setOpenCatigoryDropdown] = useState(false);

  const toggleCatigoryDropdown = () => {
    setOpenCatigoryDropdown(prevState => !prevState);
  };

  // const handleMenuTypeToggle = (item) => {
  //   setSelectedCategory(item)
  // };
  // console.log(editingMenu)

  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(prevState => !prevState);
  };

  const handleMenuTypeToggle = (item) => {
    setSelectedCategory(item)
  };

  const handleCatigoryMenuTypeToggle = (type) => {
    setNewItem(prevState => {
      const updatedMenuType = prevState.category.includes(type)
        ? prevState.category.filter(item => item !== type)
        : [...prevState.category, type];
      return { ...prevState, category: updatedMenuType };
    });
  };

  const fontstyles = TextStyles();
  return (
    <>
      <ScrollView
        // ref={scrollViewRef}
        className='px-3 h-full w-full'
        style={{ backgroundColor: Colors.dark.colors.backGroundColor }}
        keyboardShouldPersistTaps='handled'
      >
        <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />

        <View className='mt-3 rounded-xl'>
          <View className='rounded-xl p-3 ' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
            <View className='items-center flex-row mb-3'>
              <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
              <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h3, { marginBottom: -4, color: Colors.dark.colors.mainTextColor }]}>Manage Categories</Text>
            </View>
            <View className='my-1'>

              <TouchableOpacity
                className='p-3 font-black flex-row items-center justify-between text-base rounded-md'
                style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                onPress={() => {
                  Keyboard.dismiss();
                  handleDropdownPress();
                }}
              >
                <Text
                  className='flex-row justify-between rounded-md'
                  style={[fontstyles.h3, { marginTop: -2, color: Colors.dark.colors.mainTextColor }]}
                >
                  {/* {selectedCategory} */}
                  {selectedCategory?.title ? selectedCategory.title : 'Select Item Categories'}
                </Text>
                <Ionicons
                  name={openDropdown ? "close" : "chevron-down"}
                  size={20}
                  color={Colors.dark.colors.mainTextColor}
                />
              </TouchableOpacity>

              {openDropdown && (
                <View className='overflow-hidden font-black mt-2 text-base rounded-md' style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}>
                  {editingMenu.map((item) => (
                    <>
                      <View style={{ padding: 10 }} className=' flex-row justify-between'>
                        <View className='flex-row gap-2'>
                          <Ionicons name="pencil-sharp" size={24} color={selectedCategory?.title == item.title ? Colors.dark.colors.mainTextColor : Colors.dark.colors.textColor} />
                          <TextInput
                            className='font-black overflow-hidden flex-row justify-between text-base rounded-md'
                            style={{ color: selectedCategory?.title == item.title ? Colors.dark.colors.mainTextColor : Colors.dark.colors.textColor }}
                            value={item.title}
                            onChangeText={(text) => editCategory(item._id, text)}
                            placeholder="Edit category title"
                          />
                        </View>
                        <View className='flex-row gap-2'>

                          <TouchableOpacity className=' justify-center items-center px-2 rounded-md'
                            style={{ backgroundColor: Colors.dark.colors.diffrentColorGreen }}
                            onPress={() => {
                              handleMenuTypeToggle(item);
                              toggleDropdown()
                            }}
                          >
                            <Text style={[fontstyles.h4, { color: Colors.dark.colors.backGroundColor }]}>Select</Text>
                          </TouchableOpacity>

                          <TouchableOpacity className=' bg-red-200 justify-center items-center px-2 rounded-md'
                            onPress={() => {
                              handleMenuTypeToggle(item);
                              toggleDropdown()
                            }}
                          >
                            <Ionicons color={Colors.dark.colors.diffrentColorRed} name="trash-bin" size={18} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  ))}
                  <TextInput
                    className='font-black mx-3 overflow-hidden flex-row justify-between text-base rounded-md'
                    style={{ color: Colors.dark.colors.mainTextColor }}
                    value={newCategoryTitle}
                    placeholderTextColor={Colors.dark.colors.textColor}
                    onChangeText={setNewCategoryTitle}
                    placeholder="Add new category"
                  />

                  <TouchableOpacity
                    className='p-3 m-2 items-center rounded-md'
                    style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}
                    onPress={addCategory}
                  >
                    <Text style={[fontstyles.h5, { marginTop: -2, color: Colors.dark.colors.mainTextColor }]}>Add Category</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                  className='p-2 mb-2 mx-2 items-center rounded-md'
                  style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}
                  onPress={toggleDropdown}
                >
                  <Text className=' font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Save Category Changes</Text>
                </TouchableOpacity> */}
                </View>
              )}
            </View>


            {selectedCategory &&

              <View>
                <View className='items-center flex-row my-3'>
                  <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
                  <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h3, { marginBottom: -4, color: Colors.dark.colors.mainTextColor }]}>Your Cusines in {selectedCategory?.title}</Text>
                </View>

                <FlatList
                  data={selectedCategory.items}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      // key={storeName}
                      className='rounded-xl p-2 mb-3 flex-row'
                      style={{ backgroundColor: Colors.dark.colors.secComponentColor }}
                    >
                      <Image
                        source={{
                          uri: item.image,
                          method: 'POST',
                          headers: {
                            Pragma: 'no-cache',
                          },
                        }}
                        defaultSource={require('./../../assets/favicon.png')}
                        className='w-12 h-12 rounded-full mr-1'
                        alt="Logo"
                      />
                      <View>
                        <Text style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]} numberOfLines={1} ellipsizeMode='tail'>
                          {TruncatedTextComponent(item.item, 11)}
                        </Text>
                        <TouchableOpacity className='flex-row items-center'>
                          <Text style={[fontstyles.h5, { color: Colors.dark.colors.textColor }]} >
                            {item.category.split('_').join(', ')}
                          </Text>
                          {/* <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} /> */}
                        </TouchableOpacity>
                      </View>
                      <View className='flex-row gap-x-2 absolute right-2 top-2 h-full'>
                        <TouchableOpacity
                          className='justify-center items-center rounded-lg px-3'
                          style={{ backgroundColor: Colors.dark.colors.diffrentColorGreen }}
                          onPress={() => editItem(item)}
                        >
                          <Text style={[fontstyles.h5, { color: Colors.dark.colors.backGroundColor }]}>
                            {item.type}
                          </Text>

                          <View className='flex-row items-center justify-center'>
                            <Text style={[fontstyles.number, { color: Colors.dark.colors.backGroundColor }]}>
                              Edit
                              {/* {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0)} {' '} */}
                              {/* {items.reduce((total, item) => total + parseInt(item.quantity, 10), 0) === 1 ? 'item' : 'items'} */}
                            </Text>
                            <Ionicons
                              style={{ transform: [{ rotate: '90deg' }], margin: -3 }}
                              name="remove-outline"
                              size={16}
                            // color={Colors.dark.colors.mainTextColor}
                            />
                            <Text style={[fontstyles.number, { color: Colors.dark.colors.backGroundColor }]}>
                              ₹{item.price}
                            </Text>
                          </View>

                        </TouchableOpacity>
                        {/* <View className='items-center justify-center h-full'> */}
                        <TouchableOpacity className=' bg-red-200 justify-center items-center px-2 rounded-lg'

                        // onPress={() => {
                        //   handleMenuTypeToggle(item);
                        // }}
                        >
                          <Ionicons color={Colors.dark.colors.diffrentColorRed} name="trash-bin-outline" size={20} />
                        </TouchableOpacity>
                        {/* </View> */}
                      </View>
                    </View>
                    // <View style={styles.itemContainer}>
                    //   <Text style={styles.item}>{item.item}</Text>
                    //   <Text style={styles.item}>{item.price}</Text>
                    //   <Text style={styles.item}>{item.description}</Text>
                    //   <Text style={styles.item}>{item.status ? "Available" : "Unavailable"}</Text>
                    //   <Button title="Edit" onPress={() => editItem(item)} />
                    // </View>
                  )}
                />
              </View>
            }
          </View>
        </View>

        {selectedCategory &&
          <View className='mt-3 rounded-xl'>
            <View className='rounded-xl p-3 ' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
              <View className='items-center flex-row mt-1'>
                <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
                <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h3, { marginBottom: -4, color: Colors.dark.colors.mainTextColor }]}>Edit Cusines in {selectedCategory?.title}</Text>
              </View>

              <View className='mt-2 flex-row items-center justify-between'>
                <View className=' w-[47%]'>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Item Name</Text>
                  <TextInput
                    value={newItem.item}
                    style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                    placeholderTextColor={Colors.dark.colors.textColor}
                    className='font-black p-2 text-base underline pl-2 my-2 text-left rounded-md'
                    onChangeText={(text) => setNewItem({ ...newItem, item: text })}
                    placeholder="Item name"
                  />
                </View>
                <View className=' w-[47%]'>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Item Price</Text>
                  <TextInput
                    value={newItem.price}
                    style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                    placeholderTextColor={Colors.dark.colors.textColor}
                    className='font-black p-2 text-base underline pl-2 my-2 text-left rounded-md'
                    onChangeText={(text) => setNewItem({ ...newItem, price: text })}
                    placeholder="Item price"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View className='mt-1 w-full'>
                <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Item Description</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                  placeholderTextColor={Colors.dark.colors.textColor}
                  className='font-black p-2 text-base underline pl-2 my-2 text-left rounded-md'
                  value={newItem.description}
                  onChangeText={(text) => setNewItem({ ...newItem, description: text })}
                  placeholder={`Describe your Product (e.g., specialties, ...)`}
                  multiline={true}
                />
              </View>
              <View className='mt-1 w-full'>
                <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Item Image</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                  placeholderTextColor={Colors.dark.colors.textColor}
                  className='font-black p-2 text-base underline pl-2 my-2 text-left rounded-md'
                  value={newItem.image}
                  onChangeText={(text) => setNewItem({ ...newItem, image: text })}
                  placeholder={`Enter Image URL (web link only, \n e.g., https://example.com/image.jpg)`}
                  multiline={true}
                />
              </View>
              <View className='mt-1 w-full'>
                <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Item Category</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                  placeholderTextColor={Colors.dark.colors.textColor}
                  className='font-black p-2 text-base underline pl-2 my-2 text-left rounded-md'
                  value={newItem.category}
                  onChangeText={(text) => setNewItem({ ...newItem, category: text })}
                  placeholder={`Item category`}
                  multiline={true}
                />
              </View>
              {/* <TextInput
                style={styles.input}
                value={newItem.category}
                onChangeText={(text) => setNewItem({ ...newItem, category: text })}
                placeholder="Item category"
              /> */}
              {/* <View className='mt-1 w-full'>
              <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Item Image</Text>

                <TouchableOpacity
                  className='p-3 my-2 font-black flex-row items-center justify-between text-base rounded-md'
                  style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                  onPress={() => {
                    Keyboard.dismiss();
                    handleCatigoryDropdownPress();
                  }}
                >
                  <Text
                    className='font-black flex-row justify-between text-base rounded-md'
                    style={{ color: Colors.dark.colors.mainTextColor }}
                  >
                    {newItem.category?.length > 0 ? newItem.category.join(', ') : 'Select Menu Type'}
                  </Text>
                  <Ionicons
                    name={openCatigoryDropdown ? "close" : "chevron-down"}
                    size={20}
                    color={Colors.dark.colors.mainTextColor}
                  />
                </TouchableOpacity>

                {openCatigoryDropdown && (
                  <View className='overflow-hidden font-black mt-2 text-base rounded-md' style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}>
                    {menuTypes.map((item) => (
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          overflow: 'hidden',
                          // backgroundColor: storeDetailsOffDays.offDays.includes(item) ? Colors.dark.colors.backGroundColor : 'transparent',
                          // borderBottomWidth: 1,
                          // borderBottomColor: '#ccc',
                        }}

                        onPress={() => {
                          handleCatigoryMenuTypeToggle(item);
                          if (item === 'None') {
                            toggleDropdown(); // If not want to close on None
                          }
                        }}
                      >
                        <Text
                          className='font-black overflow-hidden flex-row justify-between text-base rounded-md'
                          style={{ color: newItem.category.includes(item) ? Colors.dark.colors.mainTextColor : Colors.dark.colors.textColor }}
                        >{item}
                        </Text>
                        {newItem.category.includes(item) && (
                          <Ionicons name="checkmark-outline" size={20} color={Colors.dark.colors.diffrentColorGreen} />
                        )}
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      className='p-2 m-2 items-center rounded-md'
                      style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}
                      onPress={toggleCatigoryDropdown}
                    >
                      <Text className=' font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View> */}

              {/* <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Item Type</Text> */}
              <View className='my-3 rounded-xl'>
                <View className='rounded-xl ' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                  <View className=' flex-row items-center justify-between'>
                    <View className=' flex-row justify-between'>
                      <TouchableOpacity
                        onPress={() => handleChange('type', 'PureVeg')}
                        style={{ backgroundColor: newItem.type === 'PureVeg' ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.backGroundColor }}
                        className=' w-[35%] p-4 rounded-l-lg items-center'
                      >
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { marginTop: -2, color: Colors.dark.colors.mainTextColor }]}>Pure Veg</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChange('type', 'Veg')}
                        style={{ backgroundColor: newItem.type === 'Veg' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.backGroundColor }}
                        className=' w-[30%] p-4 items-center'
                      >
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { marginTop: -2, color: Colors.dark.colors.mainTextColor }]}>Veg</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleChange('type', 'NonVeg')}
                        style={{ backgroundColor: newItem.type === 'NonVeg' ? Colors.dark.colors.diffrentColorRed : Colors.dark.colors.backGroundColor }}
                        className=' w-[35%] p-4 rounded-r-lg items-center'
                      >
                        <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h5, { marginTop: -2, color: Colors.dark.colors.mainTextColor }]}>Non Veg</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {/* <TextInput
    style={styles.input}
    value={newItem.type}
    onChangeText={(text) => setNewItem({ ...newItem, type: text })}
    placeholder="Item Type"
  /> */}

              <TouchableOpacity
                className='p-3 items-center rounded-md'
                style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}
                onPress={addItem}
              >
                <Text style={[fontstyles.h5, { marginTop: -2, color: Colors.dark.colors.mainTextColor }]}>{newItem.id ? "Update Item" : "Add Item"}</Text>
              </TouchableOpacity>

              {/* <Button title= onPress={addItem} /> */}

            </View>
          </View>
        }

        <View>
          <TouchableOpacity onPress={handleSaveMenu}
            className=' w-full my-3 rounded-xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }} className='items-center justify-center p-3' >
              <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.blackh2, { paddingBottom: 4, color: Colors.dark.colors.mainTextColor }]}>SAVE</Text>
            </View>
          </TouchableOpacity>
        </View>







      </ScrollView>
      {/* <View className='mx-3'>
        <LinearGradient
          className=' absolute w-full bottom-0 h-10'
          colors={['transparent', Colors.dark.colors.backGroundColor, Colors.dark.colors.backGroundColor]}>
          <TouchableOpacity onPress={handleSaveMenu}
            className=' w-full absolute bottom-0 my-3 rounded-xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }} className='items-center justify-center p-3' >
              <Text numberOfLines={1} ellipsizeMode='tail' className=' font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>SAVE</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>

      </View> */}
      {/* ToastNotification */}
      {showToast && (
        <ToastNotification
          title="Success!"
          description="Menu saved successfully."
          showToast={showToast}
        />
      )}
    </>
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
