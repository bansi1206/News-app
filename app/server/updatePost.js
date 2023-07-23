const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function updatePost(postId, title, content, published_at, menu_id, menu_item_id, coverPath, author, status) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const postCollection = db.collection('post');

        const updatedFields = {
            title,
            content,
            published_at,
            menu_id,
            menu_item_id,
            author,
            status,
        };


        if (coverPath !== '') {
            updatedFields.cover = coverPath;
        }

        const result = await postCollection.updateOne({ _id: new ObjectId(postId) }, { $set: updatedFields });
        console.log(result);

        const updatedPost = await postCollection.findOne({ _id: new ObjectId(postId) });
        console.log(updatedPost);

        return updatedPost;
    } catch (error) {
        console.log('Error updating post:', error);
        throw error;
    }
}

module.exports = { updatePost };

