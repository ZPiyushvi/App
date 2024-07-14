const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: { type: String },
    item: { type: String },
    price: { type: String },
    description: { type: String },
    type: { type: String },
    stutus: { type: Boolean },
    // category: { type: String, required: true },
    // image: { type: String, required: true },
    // quantity: { type: String, required: true },
    rating: { type: String },
    ratingcount: { type: String },
    // longdescription: { type: String, required: true }
});

const menuCategorySchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String },
    items: { type: [itemSchema] }
});

const outletSchema = new mongoose.Schema({
    id:{ type: String, required: true },
    name: { type: String, required: true },
    shopkeeperName: { type: String, required: true },
    upiId: { type: String, required: true },
    featured: { type: Boolean, default: false },
    type: { type: String, required: true },

    offDays: { type: [String], required: true },
    menuType: { type: [String], required: true },

    location: { type: String, required: true },
    rating: { type: Number },
    ratingcount: { type: Number },
    image: { type: String, required: true },
    details: { type: String, required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    leaveDay: { type: String, required: true },
    userId: { type: String, ref: 'User', required: true },

    menu: { type: [menuCategorySchema] },
});


// const outletSchema = new mongoose.Schema({
//     name: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
//     // name: { type: String, required: true },
//     // shopkippername: { type: String, required: true },
//     upiId: { type: String, required: true },
//     // featured: { type: String, required: true, enum: ["true", "false"] }, // Should be setby Devloper Only
//     type: { type: String, required: true },
//     // menutype: { type: String, required: true },
//     menu: { type: [menuCatagorySchema], required: true },
//     location: { type: String, required: true },
//     // locationdetailed: { type: String, required: true },
//     // rating: { type: String, required: true },
//     // ratingcount: { type: String, required: true },
//     image: { type: String, required: true },
//     // details: { type: String, required: true },
//     openingtime: { type: String, required: true },
//     closingtime: { type: String, required: true },
//     offdays: { type: String, required: true },
//     leaveDay: { type: String, required: true }
// });

module.exports = mongoose.model('OutletInfo', outletSchema);