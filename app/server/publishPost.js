const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function publishPost(postId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const postCollection = db.collection('post');

        const updateQuery = { $set: { status: 'published' } };

        await postCollection.updateOne({ _id: new ObjectId(postId) }, updateQuery);

        console.log('Post published successfully');
    } catch (error) {
        console.log('Error publishing post:', error);
        throw error;
    }
}

module.exports = { publishPost };
