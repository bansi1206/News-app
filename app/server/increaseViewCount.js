const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function increaseViewCount(postId) {
    try {
        // Kết nối tới cơ sở dữ liệu MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const collection = client.db('News').collection('post'); // Thay đổi thành tên collection của bạn

        // Tăng lượt xem cho bài viết với postId tương ứng
        await collection.updateOne(
            { _id: new ObjectId(postId) },
            { $inc: { viewCount: 1 } }
        );

        console.log('View count increased for post:', postId);
    } catch (error) {
        throw error;
    }
}

module.exports = { increaseViewCount };