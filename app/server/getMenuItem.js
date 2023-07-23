const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getMenuItem() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuItemCollection = db.collection('menu item');


        const menuItem = await menuItemCollection.find().toArray();


        return menuItem;
    } catch (error) {
        console.log('Error fetching menu item data:', error);
        throw error;
    }
}

async function getMenuItemById(menuItemId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuItemCollection = db.collection('menu item');


        const menuItem = await menuItemCollection.findOne({ _id: new ObjectId(menuItemId) });


        return menuItem;
    } catch (error) {
        console.log('Error fetching menu item data:', error);
        throw error;
    }
}

module.exports = { getMenuItem, getMenuItemById };
