const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const ListingItem = require("../models/listingitem");

//  Connect to DB
 mongoose.connect("mongodb+srv://urbaneats013:ZqVOdtqgEwIb0KUP@clusterone.d1yxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne")
   .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function seedMenuItems(lapinoz) {
  await ListingItem.deleteMany({ restaurantId: lapinoz._id });

const menuItems = [
   {
    title: "Cheese Burst Pizza",
    price: 240,
    rating_star: 4.6,
    rating_count: 1200,
    description: "Loaded with triple cheese and creamy burst inside the crust.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/5/28/d76f21d7-8334-4281-b4e6-6a97203f8b46_8725adb6-aa28-479f-bdf5-5e6dd32e0ee0.png"
  },
  {
    title: "Veggie Delight",
    price: 210,
    rating_star: 4.5,
    rating_count: 1050,
    description: "Topped with capsicum, onion, tomato, and olives.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/5/8/887dba68-573d-405e-b84c-95ffb29570f9_693f6fc8-dcc2-4e76-a45c-554a8891dfa5.JPG"
  },
  {
    title: "Paneer Tikka Pizza",
    price: 260,
    rating_star: 4.7,
    rating_count: 1120,
    description: "Indian-style paneer tikka chunks with spicy seasoning.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/5/8/2dc4bd3e-9f94-4742-9b59-937197d6a6d7_61007401-9715-44d2-b5fb-c3327c42db49.JPG"
  },
  {
    title: "Garlic Breadsticks",
    price: 110,
    rating_star: 4.4,
    rating_count: 900,
    description: "Soft, buttery garlic breadsticks with cheese dip.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/5/8/50a45b8a-126f-4e60-b202-29c360939b09_d487aaac-be79-413b-9f37-cea16f04580c.JPG"
  },
  {
    title: "Choco Lava Cake",
    price: 90,
    rating_star: 4.6,
    rating_count: 780,
    description: "Gooey molten chocolate cake – sweet and satisfying.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/xdl55wtgzsdf9cpozjko"
 }
];


  for (const item of menuItems) {
    await ListingItem.create({ ...item, restaurantId: lapinoz._id });
  }

  console.log("La Pino'z menu seeded.");
  mongoose.connection.close();
}

//Then define this second
async function seedLapinozMenu() {
  let lapinoz = await Restaurant.findOne({ name: "La Pino'z" });

  if (!lapinoz) {
    console.log("La Pino'z not found. Creating...");
    const newRest = new Restaurant({
      name: "La Pino'z",
      isFixedBrand: true,
    });
    await newRest.save();
    console.log("Created La Pino'z");
    return seedMenuItems(newRest);
  }
  return seedMenuItems(lapinoz);
  
}
    
seedLapinozMenu();
