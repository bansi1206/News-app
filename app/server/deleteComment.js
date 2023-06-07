const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function deleteComment(commentId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const commentCollection = db.collection('comment');

        const comment = await commentCollection.findOne({ _id: new ObjectId(commentId) });

        if (comment.parentId === null) {

            await commentCollection.deleteMany({
                $or: [
                    { _id: new ObjectId(commentId) },
                    { parentId: commentId }
                ]
            });
        } else {

            await commentCollection.deleteOne({ _id: new ObjectId(commentId) });
        }

        console.log('Comment deleted successfully');
    } catch (error) {
        console.log('Error deleting comment:', error);
        throw error;
    }
}

module.exports = { deleteComment };
