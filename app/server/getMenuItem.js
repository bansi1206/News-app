const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getMenuItem() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const menuItemCollection = db.collection('menu item'); // Thay đổi tên collection cho bảng menu item của bạn

        // Lấy dữ liệu từ bảng menu item
        const menuItem = await menuItemCollection.find().toArray();

        // Trả về dữ liệu menu item
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

        const db = client.db('News'); // Thay đổi tên database của bạn
        const menuItemCollection = db.collection('menu item'); // Thay đổi tên collection cho bảng menu item của bạn

        // Lấy dữ liệu từ bảng menu item dựa trên id
        const menuItem = await menuItemCollection.findOne({ _id: new ObjectId(menuItemId) });

        // Trả về dữ liệu menu item
        return menuItem;
    } catch (error) {
        console.log('Error fetching menu item data:', error);
        throw error;
    }
}

module.exports = { getMenuItem, getMenuItemById };
