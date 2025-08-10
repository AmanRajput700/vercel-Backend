const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/150",
        set: (v) => v === "" ? "https://via.placeholder.com/150" : v,
    },
    rating_star: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    rating_count: {
        type: Number,
        default: 0,
    },
    knownFor: {
        type: [String], // storing multiple categories as array
        enum: ['burger', 'pizza', 'biryani', 'thali', 'dosa', 'cake', 'veg-meals'],
        required: true,
    },
    delivery_time: {
        type: String,
        default:"NA" // e.g. "20-25 Minutes"
    },
    location: {
        type: String,
        default:"-"
    },
    price_for_two: {
        type: Number, 
        default:0
    },
    isFixedBrand: { 
        type: Boolean, default: false 
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
