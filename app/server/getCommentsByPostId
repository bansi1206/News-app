const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getCommentsByPostId(postId) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const commentCollection = db.collection('comment'); // Thay đổi tên collection cho bảng comment của bạn
        const userCollection = db.collection('user'); // Thay đổi tên collection cho bảng user của bạn

        // Lấy danh sách comment theo postId
        const comments = await commentCollection.find({ post_id: postId }).toArray();

        // Lấy danh sách user_id từ các comment
        const userIds = comments.map(comment => comment.user_id);


        // Chuyển đổi chuỗi thành ObjectId
        const userIdsObjectIds = userIds.map(userId => new ObjectId(userId));


        // Truy vấn các user theo _id đã được chuyển đổi
        const users = await userCollection.find({ _id: { $in: userIdsObjectIds } }).toArray();

        // Kết nối thông tin người dùng với từng comment
        const commentsWithUserInfo = comments.map(comment => {
            const user = users.find(user => user._id.toString() === comment.user_id.toString());
            console.log(user)
            return {
                ...comment,
                user_name: user.username ? user.username : 'Unknown User'
            };
        });

        console.log(commentsWithUserInfo)
        // Trả về danh sách comment đã kết nối thông tin người dùng
        return commentsWithUserInfo;
    } catch (error) {
        console.log('Error fetching comments:', error);
        throw error;
    }
}

module.exports = { getCommentsByPostId };
