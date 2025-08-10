const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingItemSchema = new Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating_star: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    rating_count: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/150",
        set: (v) => v === "" ? "https://via.placeholder.com/150" : v,
    },
    description: {
        type: String,
    }
}, { timestamps: true });

listingItemSchema.index({ restaurantId: 1 }); // for faster queries

const ListingItem = mongoose.model("ListingItem", listingItemSchema);
module.exports = ListingItem;
