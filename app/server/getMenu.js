const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getMenu() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuCollection = db.collection('menu');


        const menu = await menuCollection.find().toArray();


        return menu;
    } catch (error) {
        console.log('Error fetching menu data:', error);
        throw error;
    }
}

async function getMenuById(menuId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuCollection = db.collection('menu');


        const menu = await menuCollection.findOne({ _id: new ObjectId(menuId) });


        return menu;
    } catch (error) {
        console.log('Error fetching menu data:', error);
        throw error;
    }
}


module.exports = { getMenu, getMenuById };

