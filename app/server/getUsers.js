const { client } = require('./db');

async function getUsers() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const usersCollection = db.collection('user');


        const users = await usersCollection.find().toArray();


        return users;
    } catch (error) {
        console.log('Error fetching menu data:', error);
        throw error;
    }
}

module.exports = { getUsers };