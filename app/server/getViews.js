const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getViews() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const collection = client.db('News').collection('views');

        const views = await collection.find().toArray();

        return views;
    } catch (error) {
        console.log('Error fetching views:', error);
        throw error;
    }
}

module.exports = { getViews };