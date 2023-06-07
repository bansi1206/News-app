const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function updateComment(commentId, updatedFields) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const commentCollection = db.collection('comment');

        const updateQuery = { $set: updatedFields };

        await commentCollection.updateOne({ _id: new ObjectId(commentId) }, updateQuery);

        console.log('Comment updated successfully');
    } catch (error) {
        console.log('Error updating comment:', error);
        throw error;
    }
}

module.exports = { updateComment };
