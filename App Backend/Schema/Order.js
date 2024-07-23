const mongoose = require('mongoose');

const itemoSchema = new mongoose.Schema({
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

const itemSchema = new mongoose.Schema({
    __v: { type: Number, default: 0 },
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    closingTime: { type: String, required: true },
    details: { type: String, required: true },
    featured: { type: Boolean, required: true },
    id: { type: String, required: true },
    image: { type: String, required: true },
    leaveDay: { type: String, required: true },
    location: { type: String, required: true },
    menuType: { type: [String], required: true },
    name: { type: String, required: true },
    offDays: { type: [String], required: true },
    openingTime: { type: String, required: true },
    orders: { type: [itemoSchema], required: true }, // Define a sub-schema if structure is known
    rating: { type: Number, required: true },
    ratingcount: { type: Number, required: true },
    shopkeeperName: { type: String, required: true },
    type: { type: String, required: true },
    upiId: { type: String, required: true },
    userId: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: { type: itemSchema, required: true },
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);