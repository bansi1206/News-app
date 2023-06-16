const { client } = require('./db');

async function getUsers() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const usersCollection = db.collection('user'); // Thay đổi tên collection cho bảng menu của bạn

        // Lấy dữ liệu từ bảng menu
        const users = await usersCollection.find().toArray();

        // Trả về dữ liệu menu
        return users;
    } catch (error) {
        console.log('Error fetching menu data:', error);
        throw error;
    }
}

module.exports = { getUsers };