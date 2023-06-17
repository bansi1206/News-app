const { ObjectId } = require('mongodb');
const { client } = require('./db');

async function deleteUser(userId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const userCollection = db.collection('user');

        await userCollection.deleteOne({ _id: new ObjectId(userId) });

        console.log('User deleted successfully');
    } catch (error) {
        console.log('Error deleting user:', error);
        throw error;
    }
}

module.exports = { deleteUser };