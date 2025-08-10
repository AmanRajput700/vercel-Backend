const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const ListingItem = require("../models/listingitem");

//  Connect to DB
 mongoose.connect("mongodb+srv://urbaneats013:ZqVOdtqgEwIb0KUP@clusterone.d1yxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne")
   .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function seedMenuItems(natural) {
  await ListingItem.deleteMany({ restaurantId: natural._id });

const menuItems = [
   {
    title: "Mango Ice Cream",
    price: 90,
    rating_star: 4.8,
    rating_count: 1200,
    description: "Made with real Alphonso mangoes – rich, sweet, and creamy.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/dbb46aa1f3ff504c27cf70c78b0f0091"
  },
  {
    title: "Tender Coconut Ice Cream",
    price: 100,
    rating_star: 4.7,
    rating_count: 980,
    description: "Refreshing coconut flavor with tender coconut pieces.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/6cd8778cf0c95e12108d06eac5c8288f"
  },
  {
    title: "Sitaphal Ice Cream",
    price: 110,
    rating_star: 4.9,
    rating_count: 1050,
    description: "Classic seasonal favorite made with real custard apples.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/1b654ff7a6b7a47d802757094517fdfa"
  },
  {
    title: "Choco Almond Fudge",
    price: 130,
    rating_star: 4.5,
    rating_count: 880,
    description: "Rich chocolate ice cream with almond crunch and fudge.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/6adb6d1ee1571542b377f745de410054"
  },
  {
    title: "Strawberry Ice Cream",
    price: 95,
    rating_star: 4.6,
    rating_count: 760,
    description: "Made from fresh strawberries – smooth and fruity delight.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/1b9e3130d79765753d436cfcec51abb2"
  }
];


  for (const item of menuItems) {
    await ListingItem.create({ ...item, restaurantId: natural._id });
  }

  console.log("Natural ice-cream menu seeded.");
  mongoose.connection.close();
}

//Then define this second
async function seedNaturalMenu() {
  let natural = await Restaurant.findOne({ name: "Natural ice-cream" });

  if (!natural) {
    console.log("Natural ice-cream not found. Creating...");
    const newRest = new Restaurant({
      name: "Natural ice-cream",
      isFixedBrand: true,
    });
    await newRest.save();
    console.log("Created Natural ice-cream");
    return seedMenuItems(newRest);
  }
  return seedMenuItems(natural);
  
}
    
seedNaturalMenu();
