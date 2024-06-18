import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';
// import {   } from 'react-native';

const initialData = {
  name: "Tea Post",
  shopkippername: "Pooja Gupta",
  upiId: "teapost@upi",
  featured: "true",
  type: "Veg",
  menutype: "Beverage",
  menu: [
    {
      title: "Beverages",
      items: [
        { id: "1", rating: "4.5", ratingcount: "314", item: "Masala Chai", price: "50", description: "Traditional Indian spiced tea.", type: "Veg", category: "Hot_Cafe", image: "https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-10-20_at_11.07.13_AM.png?v=1697780292", quantity: "0", longdescription: "Aromatic tea blended with a mixture of Indian spices such as cardamom, ginger, and cloves." },
        { id: "2", rating: "3.5", ratingcount: "314", item: "Cold Coffee", price: "70", description: "Refreshing cold coffee.", type: "Veg", category: "Cold_Cafe", image: "https://www.funfoodfrolic.com/wp-content/uploads/2020/09/Cold-Coffee-Thumbnail.jpg", quantity: "0", longdescription: "Smooth coffee served chilled, often topped with cream or ice cream." },
        { id: "3", rating: "3.0", ratingcount: "314", item: "Cold Coco", price: "60", description: "Chilled chocolate-flavored drink.", type: "Veg", category: "Cold_Cafe", image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/cre8krdqeeuyq74gbpsy", quantity: "0", longdescription: "Delicious cocoa drink served cold, perfect for chocolate lovers." },
        { id: "4", rating: "1.5", ratingcount: "314", item: "Iced Tea", price: "65", description: "Chilled tea served with ice.", type: "Veg", category: "Cold_Cafe", image: "https://www.funfoodfrolic.com/wp-content/uploads/2017/05/Iced-Tea-3.jpg", quantity: "0", longdescription: "Refreshing iced tea with a hint of lemon, ideal for hot days." }
      ]
    },
    {
      title: "Snacks",
      items: [
        { id: "1", rating: "1.5", ratingcount: "314", item: "Sandwich", price: "100", description: "Classic sandwich with assorted fillings.", type: "Veg", category: "Snacks", image: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-4.jpg", quantity: "0", longdescription: "Freshly made sandwich with a variety of vegetables and spreads." },
        { id: "2", rating: "2.5", ratingcount: "314", item: "Maggi", price: "80", description: "Popular instant noodles dish.", type: "Veg", category: "Snacks", image: "https://www.honeywhatscooking.com/wp-content/uploads/2022/02/Pav-Bhaji-Maggi-Noodles4-e1672251408882.jpg", quantity: "0", longdescription: "Quick and tasty Maggi noodles cooked with vegetables and spices." },
        { id: "3", rating: "4.0", ratingcount: "314", item: "Puff", price: "40", description: "Flaky pastry filled with savory stuffing.", type: "Veg", category: "Snacks", image: "https://theobroma.in/cdn/shop/files/Chicken_CheesePuff-Square.jpg?v=1711609351", quantity: "0", longdescription: "Crispy puff pastry filled with a savory mix, perfect for a quick bite." }
      ]
    },
    {
      title: "Meals",
      items: [
        { id: "1", rating: "4.5", ratingcount: "314", item: "Noodles", price: "90", description: "Stir-fried noodles with vegetables.", type: "Veg", category: "Hot_Meal", image: "https://recipetineats.com/wp-content/uploads/2019/11/Lo-Mein_3.jpg", quantity: "0", longdescription: "Delicious stir-fried noodles with a variety of fresh vegetables and sauces." },
        { id: "2", rating: "4.5", ratingcount: "314", item: "Thepla", price: "30", description: "Gujarati flatbread seasoned with spices.", type: "Veg", category: "Hot_Meal", image: "https://pipingpotcurry.com/wp-content/uploads/2023/03/methi-thepla-recipe.jpg", quantity: "0", longdescription: "Traditional Gujarati flatbread made with fenugreek leaves and spices." },
        { id: "3", rating: "4.5", ratingcount: "314", item: "Poha", price: "35", description: "Flattened rice cooked with spices and vegetables.", type: "Veg", category: "Hot_Meal", image: "https://media.vogue.in/wp-content/uploads/2020/10/poha-recipe-1920x1080.jpg", quantity: "0", longdescription: "Light and healthy flattened rice dish cooked with onions, mustard seeds, and curry leaves." },
        { id: "4", rating: "4.5", ratingcount: "314", item: "Upma", price: "35", description: "South Indian dish made from semolina.", type: "Veg", category: "Hot_Meal", image: "https://www.dwarakaorganic.com/wp-content/uploads/2022/04/Upma-870x470.jpg", quantity: "0", longdescription: "Hearty semolina dish cooked with vegetables and spices, a popular South Indian breakfast." }
      ]
    }
  ],
  location: "Emiet Hostel",
  locationdetailed: "Emiet Hostel",
  rating: "4.5",
  ratingcount: "314",
  image: "https://www.iitgn.ac.in/student/lifeoncampus/facilities/images/thumb/teapost.jpg",
  details: "The Tea Post outlet in the campus has a relaxed environment and serves great tea, light snacks, magazines and newspapers. The outlet offers a variety of hot and cold beverages like cold coffee, cold coco and iced tea, apart from a range of food items including sandwiches, puffs, noodles and many other traditional snacks like thepla, poha, and upma.",
  openingtime: "9:00 am",
  closingtime: "3:00 am",
  offdays: "None"
};

const App = () => {
  const [menuItems, setMenuItems] = useState(initialData.menu);

  const handleIncrement = (id, title) => {
    setMenuItems(prevItems =>
      prevItems.map(menu =>
        menu.title === title
          ? {
            ...menu,
            items: menu.items.map(item =>
              item.id === id
                ? { ...item, quantity: String(parseInt(item.quantity) + 1) }
                : item
            ),
          }
          : menu
      )
    );
  };

  const handleDecrement = (id, title) => {
    setMenuItems(prevItems =>
      prevItems.map(menu =>
        menu.title === title
          ? {
            ...menu,
            items: menu.items.map(item =>
              item.id === id
                ? { ...item, quantity: item.quantity > 0 ? String(parseInt(item.quantity) - 1) : '0' }
                : item
            ),
          }
          : menu
      )
    );
  };

  return (
    <View>
      {menuItems.map(menu => (
        <View key={menu.title}>
          <Text>{menu.title}</Text>
          {menu.items.map(item => (
            <View key={item.id}>
              <Text>{item.item}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrement(item.id, menu.title)}>
                <Ionicons name="add-circle-outline" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDecrement(item.id, menu.title)}>
                <Ionicons name="remove-circle-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default App;
