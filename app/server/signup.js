const { client } = require('./db');
const bcrypt = require('bcrypt');


async function signup(username, password, email, role, avatarPath) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const userCollection = db.collection('user');
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            username,
            password: hashedPassword,
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

module.exports = { signup, checkValidate };
