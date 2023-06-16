const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function updateMenu(id, title) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuCollection = db.collection('menu');

        await menuCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title } }
        );

        console.log('Menu updated successfully');
    } catch (error) {
        console.log('Error updating menu:', error);
        throw error;
    }
}

async function updateMenuItem(menuItemId, title, menuId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuItemCollection = db.collection('menu item');

        await menuItemCollection.updateOne(
            { _id: new ObjectId(menuItemId) },
            { $set: { title, menu_id: menuId } }
        );

        console.log('Menu item updated successfully');
    } catch (error) {
        console.log('Error updating menu item:', error);
        throw error;
    }
}

module.exports = { updateMenu, updateMenuItem };