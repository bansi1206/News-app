const { client } = require('./db');

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

module.exports = { getMenu };
