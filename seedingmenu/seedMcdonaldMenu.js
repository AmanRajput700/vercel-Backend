const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const ListingItem = require("../models/listingitem");

//  Connect to DB
 mongoose.connect("mongodb+srv://urbaneats013:ZqVOdtqgEwIb0KUP@clusterone.d1yxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne")
   .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function seedMenuItems(mcdonald) {
  await ListingItem.deleteMany({ restaurantId: mcdonald._id });

 const menuItems = [
  {
    title: "McAloo Tikki Burger",
    price: 60,
    rating_star: 4.1,
    rating_count: 420,
    description: "Crispy Aloo patty with tangy tomato mayo, onions, and bun toasted to perfection.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/b13811eeee71e578bc6ca89eca0ec87f"  },
  {
    title: "McSpicy Paneer Burger",
    price: 180,
    rating_star: 4.3,
    rating_count: 360,
    description: "Crispy paneer patty spiced to perfection, with creamy sauces and lettuce in a toasted bun.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/FOOD_CATALOG/IMAGES/CMS/2025/3/20/fbe115bf-e31e-4613-b1cd-76f1a1f2c990_92f1bf54-38bc-4e6f-b5aa-6fcbeff43342.png"
  },
  {
    title: "Veg Maharaja Mac",
    price: 220,
    rating_star: 4.5,
    rating_count: 500,
    description: "Double patties, jalapeños, cheese and sauces stacked in three layers of bun.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/FOOD_CATALOG/IMAGES/CMS/2024/6/21/06354d09-be1b-406c-86b5-49dc9b5062d1_2f80f39e-c951-4ca6-8fca-a243a18c3448.png"
  },
  {
    title: "Fries (Medium)",
    price: 110,
    rating_star: 4.4,
    rating_count: 890,
    description: "Crispy golden fries, sprinkled with just the right amount of salt.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/4a170da5ecae92e11410a8fbb44c8476"
  },
  {
    title: "Pizza McPuff",
    price: 45,
    rating_star: 4.0,
    rating_count: 520,
    description: "Veggies and gooey cheese in a crispy baked puff with Italian-style seasoning.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/abe4b8cdf0f1bbfd1b9a7a05be3413e8"
  },
  {
    title: "McFlurry Oreo Small",
    price: 90,
    rating_star: 4.6,
    rating_count: 410,
    description: "Soft serve vanilla ice cream blended with crunchy Oreo cookie bits.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/f966500ed8b913a16cfdb25aab9244e4"
  },
  {
    title: "Strawberry Shake",
    price: 140,
    rating_star: 4.2,
    rating_count: 390,
    description: "Creamy milkshake with rich strawberry flavor topped with whipped cream.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/506ee1bbca19fffa27844178ecae719a"
  }
];


  for (const item of menuItems) {
    await ListingItem.create({ ...item, restaurantId: mcdonald._id });
  }

  console.log("mcdonald menu seeded.");
  mongoose.connection.close();
}

//Then define this second
async function seedMcDonaldMenu() {
  let mcdonald = await Restaurant.findOne({ name: "McDonald's" });

  if (!mcdonald) {
    console.log("mcdonald's not found. Creating...");
    const newRest = new Restaurant({
      name: "McDonald's",
      isFixedBrand: true,
    });
    await newRest.save();
    console.log("Created Mcdonald's");
    return seedMenuItems(newRest);
  }
  return seedMenuItems(mcdonald);
  
}
    
seedMcDonaldMenu();
