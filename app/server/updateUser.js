const { ObjectId } = require('mongodb');
const { client } = require('./db');


async function updateUser(userId, password, email, avatarPath) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const userCollection = db.collection('user');

        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password, email, avatar: avatarPath } }
        );

        console.log('User updated successfully');
    } catch (error) {
        console.log('Error updating user:', error);
        throw error;
    }
}

module.exports = { updateUser };
