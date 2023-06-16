const { client } = require('./db');

async function createMenu(title) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuCollection = db.collection('menu');

        const result = await menuCollection.insertOne({ title });

        console.log('Menu created successfully');
        return result.insertedId;
    } catch (error) {
        console.log('Error creating menu:', error);
        throw error;
    }
}


async function createMenuItem(title, menuId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuItemCollection = db.collection('menu item');

        const result = await menuItemCollection.insertOne({ title, menu_id: menuId });

        console.log('Menu item created successfully');
        return result.insertedId;
    } catch (error) {
        console.log('Error creating menu item:', error);
        throw error;
    }
}


module.exports = { createMenu, createMenuItem };
