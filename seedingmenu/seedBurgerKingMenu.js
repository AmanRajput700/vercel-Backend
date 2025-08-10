const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const ListingItem = require("../models/listingitem");

//  Connect to DB
 mongoose.connect("mongodb+srv://urbaneats013:ZqVOdtqgEwIb0KUP@clusterone.d1yxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne")
   .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function seedMenuItems(burgerking) {
  await ListingItem.deleteMany({ restaurantId: burgerking._id });

const menuItems = [
  {
    title: "Whopper Burger",
    price: 150,
    rating_star: 4.6,
    rating_count: 1200,
    description: "Grilled patty with lettuce, tomato, onion, and signature sauce.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/11/29/dc90cc06-f883-430d-be4b-75141c8064d9_6b832721-694c-4df4-96f0-308388144da0.jpg"
  },
  {
    title: "Veggie Burger",
    price: 120,
    rating_star: 4.3,
    rating_count: 980,
    description: "Crispy vegetable patty served with fresh veggies and mayo.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/19/d4387d28-73ab-45b7-b424-61588863d158_9477217d-7c7a-4834-919a-b9ae7d7cf950.jpg"
  },
  {
    title: "French Fries (Medium)",
    price: 90,
    rating_star: 4.5,
    rating_count: 1500,
    description: "Crispy golden potato fries with a dash of salt.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/19/fa747205-3c4d-497c-a948-65f3c224a4cf_11129959-8182-4b8c-bbb5-db49665fba19.jpg"
  },
  {
    title: "Crispy Chicken Burger",
    price: 170,
    rating_star: 4.4,
    rating_count: 870,
    description: "Juicy chicken patty with crunchy coating and spicy sauce.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/19/03972ff7-ca47-4b34-a777-bec55c47869e_8944b667-7b9c-418b-88f3-df885ddadd6b.jpg"
  },
  {
    title: "Chocolate Shake",
    price: 110,
    rating_star: 4.2,
    rating_count: 640,
    description: "Rich and creamy chocolate milkshake topped with whipped cream.",
    image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/19/cddbd1f0-c2fc-4af3-a108-b482cc0027e2_0564277b-594b-4aa9-a7cd-6796803092fc.jpg"
  },
];


  for (const item of menuItems) {
    await ListingItem.create({ ...item, restaurantId: burgerking._id });
  }

  console.log("burgerking menu seeded.");
  mongoose.connection.close();
}

//Then define this second
async function seedBurgerKingMenu() {
  let burgerking = await Restaurant.findOne({ name: "BurgerKing" });

  if (!burgerking) {
    console.log("BurgerKing not found. Creating...");
    const newRest = new Restaurant({
      name: "BurgerKing",
      isFixedBrand: true,
    });
    await newRest.save();
    console.log("Created BurgerKing");
    return seedMenuItems(newRest);
  }
  return seedMenuItems(burgerking);
  
}
    
seedBurgerKingMenu();
