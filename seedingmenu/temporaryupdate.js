const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const ListingItem = require("../models/listingitem");

const run = async () => {
     mongoose.connect("mongodb+srv://urbaneats013:ZqVOdtqgEwIb0KUP@clusterone.d1yxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne")
       .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  await Restaurant.updateMany(
    {
      $or: [
        { location: { $exists: false } },
        { price_for_two: { $exists: false } }
      ]
    },
    {
      $set: {
        location: 'Surat',
        price_for_two: 300
      }
    }
  );

  console.log('Update complete');
  mongoose.disconnect();
};

run();
