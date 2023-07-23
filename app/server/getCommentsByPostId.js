const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getCommentsByPostId(postId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const commentCollection = db.collection('comment');
        const userCollection = db.collection('user');


        const comments = await commentCollection.find({ post_id: postId }).toArray();


        const userIds = comments.map(comment => comment.user_id);



        const userIdsObjectIds = userIds.map(userId => new ObjectId(userId));



        const users = await userCollection.find({ _id: { $in: userIdsObjectIds } }).toArray();


        const commentsWithUserInfo = comments.map(comment => {
            const user = users.find(user => user._id.toString() === comment.user_id.toString());
            console.log(user)
            return {
                ...comment,
                user_name: user.username ? user.username : 'Unknown User',
                avatar: user.avatar
            };
        });

        console.log(commentsWithUserInfo)

        return commentsWithUserInfo;
    } catch (error) {
        console.log('Error fetching comments:', error);
        throw error;
    }
}

module.exports = { getCommentsByPostId };
