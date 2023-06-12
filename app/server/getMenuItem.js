const { client } = require('./db');

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

module.exports = { getMenuItem };
