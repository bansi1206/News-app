const { client } = require('./db');


async function getPostById(postId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const collection = db.collection('post');

        const post = await collection.findOne({ _id: postId });
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
