const { client } = require('./db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

async function authenticate(username, password) {
    try {
        // Kết nối tới cơ sở dữ liệu MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const collection = client.db('News').collection('user');
        const user = await collection.findOne({ username });
        console.log(user);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return {
                    success: true,
                    user: { id: user._id, name: user.name, role: user.role },
                };
            } else {
                return { success: false, message: 'Incorrect password' };
            }
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        console.log('Error authenticating user', error);
        return { success: false, message: 'Error authenticating user' };
    }
}

async function getUserById(userId) {
    try {
        await client.connect();
        const collection = client.db('News').collection('user');
        const user = await collection.findOne({ _id: new ObjectId(userId) });
        return user;
    } catch (error) {
        console.log('Error fetching user by id:', error);
        throw new Error('Error fetching user by id');
    }
}

module.exports = { authenticate, getUserById };

