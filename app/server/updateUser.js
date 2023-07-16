const { ObjectId } = require('mongodb');
const { client } = require('./db');
const bcrypt = require('bcrypt');

async function updateUser(userId, userData) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const userCollection = db.collection('user'); // Thay đổi tên collection cho bảng users của bạn

        if (userData.password) {
            // Mã hóa mật khẩu mới bằng bcrypt
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
        }

        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: userData }
        );

        console.log('User updated successfully');

        return true;
    } catch (error) {
        console.log('Error updating user:', error);
        throw error;
    }
}

module.exports = { updateUser };
