const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const ListingItem = require("../models/listingitem");

//  Connect to DB
 mongoose.connect("mongodb+srv://urbaneats013:ZqVOdtqgEwIb0KUP@clusterone.d1yxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne")
   .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function seedMenuItems(dominos) {
  await ListingItem.deleteMany({ restaurantId: dominos._id });

const menuItems = [
   {
    title: "Farmhouse Pizza",
    price: 260,
    rating_star: 4.5,
    rating_count: 1100,
    description: "Delightful combo of onion, capsicum, tomato & mushrooms.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/3c0324137db05f9caf2b55748dda41ca"
  },
  {
    title: "Peppy Paneer",
    price: 280,
    rating_star: 4.7,
    rating_count: 1300,
    description: "Flavorful paneer with crisp capsicum and red paprika.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/3/12/0a56e5af-f99d-4727-8973-1e016e4eae8b_5b7c77c4-d91f-4347-bcc4-f163c9ec0fb2.jpg_compressed"
  },
  {
    title: "Veg Loaded",
    price: 230,
    rating_star: 4.3,
    rating_count: 950,
    description: "Tomato, jalapeno, capsicum & grilled mushroom overload.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/13/a329ceef-8b23-4662-baa8-f19ac334110d_68f97a32-2e74-40e5-a9d7-8758c5c55c14.jpg"
  }
];


  for (const item of menuItems) {
    await ListingItem.create({ ...item, restaurantId: dominos._id });
  }

  console.log("Domino's menu seeded.");
  mongoose.connection.close();
}

//Then define this second
async function seedDominosMenu() {
  let dominos = await Restaurant.findOne({ name: "Domino's" });

  if (!dominos) {
    console.log("Domino's not found. Creating...");
    const newRest = new Restaurant({
      name: "Domino's",
      isFixedBrand: true,
    });
    await newRest.save();
    console.log("Created Domino's");
    return seedMenuItems(newRest);
  }
  return seedMenuItems(dominos);
  
}
    
seedDominosMenu();
