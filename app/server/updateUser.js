const { ObjectId } = require('mongodb');
const { client } = require('./db');

async function updateUser(userId, userData) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const userCollection = db.collection('user'); // Thay đổi tên collection cho bảng users của bạn

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
