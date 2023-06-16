const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getMenu() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const menuCollection = db.collection('menu'); // Thay đổi tên collection cho bảng menu của bạn

        // Lấy dữ liệu từ bảng menu
        const menu = await menuCollection.find().toArray();

        // Trả về dữ liệu menu
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

        const db = client.db('News'); // Thay đổi tên database của bạn
        const menuCollection = db.collection('menu'); // Thay đổi tên collection cho bảng menu của bạn

        // Lấy dữ liệu từ bảng menu dựa trên id
        const menu = await menuCollection.findOne({ _id: new ObjectId(menuId) });

        // Trả về dữ liệu menu
        return menu;
    } catch (error) {
        console.log('Error fetching menu data:', error);
        throw error;
    }
}


module.exports = { getMenu, getMenuById };

