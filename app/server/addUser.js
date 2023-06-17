const { client } = require('./db');

async function addUser(username, email, password, avatar, role) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const userCollection = db.collection('user');

        const newUser = {
            username,
            email,
            password,
            role,
            avatar,
        };

        await userCollection.insertOne(newUser);

        console.log('User added successfully');
    } catch (error) {
        console.log('Error adding user:', error);
        throw error;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

module.exports = { addUser };
