const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const ListingItem = require("../models/listingitem");

// 👇 Connect to DB
 mongoose.connect("mongodb+srv://urbaneats013:ZqVOdtqgEwIb0KUP@clusterone.d1yxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne")
   .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Define this FIRST so it's available when called
async function seedMenuItems(pizzaHut) {
  await ListingItem.deleteMany({ restaurantId: pizzaHut._id });

 const menuItems = [
  {
    title: "Kadhai Paneer",
    price: 450,
    rating_star: 4.3,
    rating_count: 215,
    description: "Take your taste buds on a joyride with juicy marinated paneer, capsicum and onion",
    image: "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/kadhai-paneer.86f5d60ae5c4f1e7f41b89be36aa275d.1.jpg"
  },
  {
    title: "Cheesy Spice Delight",
    price: 385,
    rating_star: 4.0,
    rating_count: 330,
    description: "Pizza topped with 100% mozzarella cheese, a flavourful dressing, onion and spicy green chilli, sprinkled with our signature spiced seasoning.",
    image: "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/cheesy-spicy-delight-pan-personal.3369663d3fab59191a4ac7e568070a1d.1.jpg"
  },
  {
    title: "Royal Spice Paneer",
    price: 490,
    rating_star: 4.4,
    rating_count: 275,
    description: "Indulge in a royal delight with juicy marinated paneer, tomato, onion, and a sauce packed with rich, aromatic spices.",
    image: "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/royal-spice-paneer.247b6a69614fb585f16c25aa912563ff.1.jpg"
  },
  {
    title: "Corn & Cheese",
    price: 320,
    rating_star: 3.9,
    rating_count: 260,
    description: "A combination of juicy Sweet Corn & 100% mozzarella cheese with flavourful signature pan sauce.",
    image: "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/corn-&-cheese.2d0ca196e3f309375afeeb35a7ff565b.1.jpg"
  },
  {
    title: "Kadhai Garlic Bread",
    price: 180,
    rating_star: 4.6,
    rating_count: 460,
    description: "Hut's Signature Garlic Bread topped with onion, green chillies and rich Kadhai Sauce",
    image: "https://api.pizzahut.io/v1/content/en-in/in-1/images/side/kadhai-garlic-bread-single.e612e4daf9145dd7e6520d70a952bb2a.1.jpg"
  },
  {
    title: "Royal Spice Paneer Melts",
    price: 210,
    rating_star: 3.4,
    rating_count: 110,
    description: "Thin & Crispy crust, loaded with spiced paneer, capsicum, onion, 100% mozzarella cheese, flavorful Kadhai sauce, folded over and baked, then brushed with herbed butter and sprinkled with Makhni seasoning.",
    image: "https://api.pizzahut.io/v1/content/en-in/in-1/images/side/kadhai-paneer-melts-single.54055e44b655d82cead5d7c39d69a83f.1.jpg"
  },
  {
    title: "Brow-wow-nie",
    price: 150,
    rating_star: 4.2,
    rating_count: 356,
    description: "A divine choco brownie for your all time chocolate cravings",
    image: "https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/brow-wow-nie-single.af07c0805f1b335d9a66c9f906c355ec.1.jpg"
  }
];


  for (const item of menuItems) {
    await ListingItem.create({ ...item, restaurantId: pizzaHut._id });
  }

  console.log("Pizza Hut menu seeded.");
  mongoose.connection.close();
}

async function seedPizzaHutMenu() {
  let pizzaHut = await Restaurant.findOne({ name: 'Pizza Hut' });

  if (!pizzaHut) {
    console.log("Pizza Hut not found. Creating...");
    const newRest = new Restaurant({
      name: 'Pizza Hut',
      isFixedBrand: true,
    });
    await newRest.save();
    console.log("Created Pizza Hut");
    return seedMenuItems(newRest); // ✅ call defined function
  }

  return seedMenuItems(pizzaHut);
  
}
    
seedPizzaHutMenu();
