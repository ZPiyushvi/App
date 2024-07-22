const mongoose = require('mongoose');

// Item Schema
const itemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    item: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    ratingcount: { type: Number, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true }
});

// Store Details Schema
const storeDetailsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    shopkeeperName: { type: String, required: true },
    upiId: { type: String, required: true },
    featured: { type: Boolean, required: true },
    type: { type: String, required: true },
    offDays: { type: [String], required: true },
    menuType: { type: [String], required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    ratingcount: { type: Number, required: true },
    image: { type: String, required: true },
    details: { type: String, required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    leaveDay: { type: String, required: true },
    userId: { type: String, required: true },
    __v: { type: Number, required: true }
});

// User Schema
const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    contactinfo: { type: String, required: true }, // Ensure this field is not null and unique if needed
    role: { type: String, required: true },
    password: { type: String, required: true }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    items: { type: [itemSchema], required: true },
    storeDetails: { type: storeDetailsSchema, required: true },
    totalPrice: { type: Number, required: true },
    Noformatdate: { type: Date, required: true },
    date: { type: String, required: true },
    userData: { type: userSchema }
});

module.exports = mongoose.model('OrderInfo', orderSchema);
