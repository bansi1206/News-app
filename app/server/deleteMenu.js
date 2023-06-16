const { ObjectId } = require('mongodb');
const { client } = require('./db');

async function deleteMenu(menuId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Replace with your database name
        const menuCollection = db.collection('menu'); // Replace with your menu collection name

        // Delete the menu by ID
        const result = await menuCollection.deleteOne({ _id: new ObjectId(menuId) });

        // Check if the deletion was successful
        if (result.deletedCount === 1) {
            console.log('Menu deleted successfully');
        } else {
            console.log('Menu not found');
        }
    } catch (error) {
        console.log('Error deleting menu:', error);
        throw error;
    }
}

async function deleteMenuItem(menuItemId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Replace with your database name
        const menuItemCollection = db.collection('menu item'); // Replace with your menu item collection name

        // Delete the menu item by ID
        const result = await menuItemCollection.deleteOne({ _id: new ObjectId(menuItemId) });

        // Check if the deletion was successful
        if (result.deletedCount === 1) {
            console.log('Menu item deleted successfully');
        } else {
            console.log('Menu item not found');
        }
    } catch (error) {
        console.log('Error deleting menu item:', error);
        throw error;
    }
}

module.exports = { deleteMenu, deleteMenuItem };
