const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: Number,
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'],
    default: 'Pending'
  },
  orderDate: { type: Date, default: Date.now },
  deliveryAddress: String
});

module.exports = mongoose.model('Order', orderSchema);
