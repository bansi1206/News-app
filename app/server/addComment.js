const { client } = require('./db');

async function addComment(postId, content, user_id, parentId, created_at) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const commentCollection = db.collection('comment');


        const comment = {
            post_id: postId,
            content,
            user_id,
            parentId,
            created_at
        };


        const result = await commentCollection.insertOne(comment);
        console.log(result);


        return {
            _id: result.insertedId,
            post_id: postId,
            content,
            user_id,
            created_at
        };
    } catch (error) {
        console.log('Error adding comment:', error);
        throw error;
    }
}

module.exports = { addComment };
