const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function deletePost(postId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const postCollection = db.collection('post');

        await postCollection.deleteOne({ _id: new ObjectId(postId) });

        console.log('Post deleted successfully');
    } catch (error) {
        console.log('Error deleting post:', error);
        throw error;
    }
}

module.exports = { deletePost };