const fs = require('fs');
const { client } = require('./db');


async function addUser(username, password, email, role, avatarPath) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const userCollection = db.collection('user');

        const user = {
            username,
            password,
            email,
            avatar: avatarPath,
            role
        };

        const result = await userCollection.insertOne(user);
        console.log(result);

        console.log(user);

        return user;
    } catch (error) {
        console.log('Error adding user:', error);
        throw error;
    }
}


async function checkValidate(username, email) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const userCollection = db.collection('user');

        const existingUser = await userCollection.findOne({
            $or: [{ username }, { email }]
        });

        return {
            usernameExists: existingUser && existingUser.username === username,
            emailExists: existingUser && existingUser.email === email
        };
    } catch (error) {
        console.log('Error checking username and email:', error);
        throw error;
    }
}

module.exports = { addUser, checkValidate };
