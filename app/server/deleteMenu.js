const { ObjectId } = require('mongodb');
const { client } = require('./db');

async function deleteMenu(menuId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuCollection = db.collection('menu');


        const result = await menuCollection.deleteOne({ _id: new ObjectId(menuId) });


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

        const db = client.db('News');
        const menuItemCollection = db.collection('menu item');


        const result = await menuItemCollection.deleteOne({ _id: new ObjectId(menuItemId) });


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
