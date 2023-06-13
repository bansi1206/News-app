const { client } = require('./db');

async function addPost(title, content, published_at, menu_id, menu_item_id, coverPath) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const postCollection = db.collection('post');

        const post = {
            title,
            content,
            published_at,
            menu_id,
            menu_item_id,
            cover: coverPath,
        };

        const result = await postCollection.insertOne(post);
        console.log(result);

        console.log(post);

        return post;
    } catch (error) {
        console.log('Error adding post:', error);
        throw error;
    }
}

module.exports = { addPost };
