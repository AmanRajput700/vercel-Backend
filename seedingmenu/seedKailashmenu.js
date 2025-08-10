const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const ListingItem = require("../models/listingitem");

//  Connect to DB
 mongoose.connect("mongodb+srv://urbaneats013:ZqVOdtqgEwIb0KUP@clusterone.d1yxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne")
   .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function seedMenuItems(kailash) {
  await ListingItem.deleteMany({ restaurantId: kailash._id });

 const menuItems = [
  {
    title: "Paneer Butter Masala",
    price: 220,
    rating_star: 4.5,
    rating_count: 540,
    description: "Creamy and rich paneer cubes simmered in a tomato-based buttery gravy.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/7/30/11eedc8a-0791-4cb7-a0ad-1f64974e91dd_3261a222-0cd0-4fd3-b7ca-05dd3e708551.JPG" 
  },
  {
    title: "Veg Biryani",
    price: 180,
    rating_star: 4.2,
    rating_count: 410,
    description: "Aromatic basmati rice cooked with mixed vegetables and Indian spices.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/4a82492710061c9bd9d2cedc8bdd869b"
  },
  {
    title: "Dal Tadka",
    price: 140,
    rating_star: 4.3,
    rating_count: 385,
    description: "Yellow dal cooked and tempered with ghee, garlic, and traditional spices.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/10/29/835dbbe7-0ad6-4a2b-8584-5d6d7b16e046_deb82669-d4f9-427e-a5d5-0ef1bf71ab42.jpg"
  },
  {
    title: "Kadhai Mushroom",
    price: 200,
    rating_star: 4.0,
    rating_count: 290,
    description: "Mushrooms sautéed with bell peppers and onions in a spiced Kadhai masala.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/3/17/56c20e45-3b05-4564-ae8c-93f65d09ae61_8c0e88d3-618b-4d57-ac0a-1fd5209200f5.jpg"
  },
  {
    title: "Tandoori Roti (2 pcs)",
    price: 40,
    rating_star: 4.6,
    rating_count: 470,
    description: "Whole wheat rotis baked in a traditional tandoor oven.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/e7b480e2c519e95687b5af40af80ff6f"
  },
  {
    title: "Jeera Rice",
    price: 110,
    rating_star: 4.1,
    rating_count: 320,
    description: "Basmati rice lightly fried with cumin seeds for a flavorful touch.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/2/19/6f31a2de-458e-4f68-be70-1b874cb19304_2bf61d89-f6f5-4dfb-9500-82ea1bfe6f75.jpg"
  },
  {
    title: "Gulab Jamun (2 pcs)",
    price: 80,
    rating_star: 4.7,
    rating_count: 510,
    description: "Soft and spongy milk-solid balls soaked in rose-flavored sugar syrup.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/1a32fa454739c6dc89f67e437bde6bf2"
  }
];


  for (const item of menuItems) {
    await ListingItem.create({ ...item, restaurantId: kailash._id });
  }

  console.log("kailash menu seeded.");
  mongoose.connection.close();
}

//Then define this second
async function seedKailashMenu() {
  let kailash = await Restaurant.findOne({ name: "Kailash" });

  if (!kailash) {
    console.log("kailash not found. Creating...");
    const newRest = new Restaurant({
      name: "Kailash",
      isFixedBrand: true,
    });
    await newRest.save();
    console.log("Created Kailash");
    return seedMenuItems(newRest);
  }
  return seedMenuItems(kailash);
  
}
    
seedKailashMenu();
