const { client } = require('./db');
const { ObjectId } = require('mongodb');


async function getPostById(postId) {
    try {
        await client.connect();
        console.log(postId)

        const db = client.db('News');
        const collection = db.collection('post');

        const post = await collection.findOne({ _id: new ObjectId(postId) });
        console.log(post);

        return post;
    } catch (error) {
        console.log('Error fetching post:', error);
        throw error;
    } finally {
        client.close();
    }
}

module.exports = { getPostById };
