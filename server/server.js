const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://himanshuhp2121:yRUjhhw8RJnuQbsA@facedatabase.oea5fja.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model for User
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  role: String,
});
const restaurantSchema = new mongoose.Schema({
  name: String,
  company: String,
  branch: String,
  location: String,
});
const menuSchema = new mongoose.Schema({
  name: String,
  type: String,
});
const itemSchema = new mongoose.Schema({
  menuType: String,
  itemName: String,
  price: Number,
});

const Item = mongoose.model('Item', itemSchema);
const Menu = mongoose.model('Menu', menuSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const User = mongoose.model('User', userSchema);

// API endpoint for user registration (sign up)
app.post('/api/signup', async (req, res) => {
  const { name, email, phone, username, password, role } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, phone, username, password: hashedPassword, role });
    await user.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});
app.post('/api/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    console.log('User signed in successfully:', username, 'Role:', user.role);
    res.json({ success: true, message: 'Sign in successful', role: user.role });
  } catch (error) {
    console.error(error);
    console.log('Sign in failed for username:', username);
    res.status(500).json({ success: false, message: 'Error signing in' });
  }
});
app.get('/api/viewtable', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude the password field from the response

    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching user data' });
  }
});
app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const userToDelete = await User.findById(userId);

    // Check if the user is trying to delete themselves or other admins
    if (!userToDelete || userToDelete.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Permission denied' });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
});
app.post('/api/add-restaurant', async (req, res) => {
  const { name, company, branch, location } = req.body;

  try {
    // Check if a restaurant with the same name and branch already exists
    const existingRestaurant = await Restaurant.findOne({ name, branch });
    if (existingRestaurant) {
      return res.status(400).json({ success: false, message: 'Restaurant with the same name and branch already exists' });
    }

    // Create a new restaurant instance
    const newRestaurant = new Restaurant({ name, company, branch, location });

    // Save the new restaurant to the database
    await newRestaurant.save();

    res.json({ success: true, message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding restaurant' });
  }
});

app.get('/api/view-restaurants', async (req, res) => {
  try {
    // Fetch all restaurants from the database
    const restaurants = await Restaurant.find({});
    res.json({ success: true, restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching restaurant data' });
  }
});

// ... Existing imports and setup ...

app.post('/api/add-menu', async (req, res) => {
  const { name, type } = req.body;

  try {
    // Create a new menu instance
    const newMenu = new Menu({ name, type });

    // Save the new menu to the database
    await newMenu.save();

    res.json({ success: true, message: 'Menu added successfully', menu: newMenu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding menu' });
  }
});

app.get('/api/view-menus', async (req, res) => {
  try {
    // Fetch all menu items from the database
    const menus = await Menu.find();

    res.json({ success: true, menus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching menu data' });
  }
});

// API endpoint for deleting a menu item by ID
app.delete('/api/delete-menu/:id', async (req, res) => {
  const menuId = req.params.id;

  try {
    // Find the menu item by ID and delete it
    const deletedMenu = await Menu.findByIdAndDelete(menuId);

    if (!deletedMenu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }

    res.json({ success: true, message: 'Menu deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting menu' });
  }
});

app.post('/api/add-menu-item', async (req, res) => {
  const { menuType, itemName, price } = req.body;

  try {
    // Create a new menu item instance
    const newMenuItem = new Item({ menuType, itemName, price });

    // Save the new menu item to the database
    await newMenuItem.save();

    res.json({ success: true, message: 'Menu item added successfully', menuItem: newMenuItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding menu item' });
  }
});

// API endpoint for fetching menu items
app.get('/api/menu-names', async (req, res) => {
  try {
    // Fetch distinct menu types from the database
    const menuNames = await Menu.distinct('name');
    res.json({ success: true, menuNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching menu Names' });
  }
});
// API endpoint for deleting a menu item by ID
app.delete('/api/delete-menu-item/:id', async (req, res) => {
  const menuItemId = req.params.id;

  try {
    // Find the menu item by ID and delete it
    const deletedMenuItem = await Menu.findByIdAndDelete(menuItemId);

    if (!deletedMenuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting menu item' });
  }
});
app.get('/api/view-menu-items', async (req, res) => {
  try {
    const menuItems = await Item.find();
    res.json({ success: true, menuItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching menu items' });
  }
});






















app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});