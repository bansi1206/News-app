const { client } = require('./db');

async function getPosts() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const collection = db.collection('post'); // Thay đổi tên collection của bạn

        const posts = await collection.find().toArray();

        console.log(posts)

        return posts;
    } catch (error) {
        console.log('Error fetching posts:', error);
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = { getPosts };
