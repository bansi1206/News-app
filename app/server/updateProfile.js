const { ObjectId } = require('mongodb');
const { client } = require('./db');
const bcrypt = require('bcrypt');

async function updateProfile(userId, password, avatarPath) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const userCollection = db.collection('user');

        const updateFields = {};

        if (password !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        if (avatarPath !== '') {
            updateFields.avatar = avatarPath;
        }

        if (Object.keys(updateFields).length === 0) {
            console.log('No fields to update');
            return;
        }

        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );

        console.log('User updated successfully');
    } catch (error) {
        console.log('Error updating user:', error);
        throw error;
    }
}

module.exports = { updateProfile };
