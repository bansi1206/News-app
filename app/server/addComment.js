const { client } = require('./db');

async function addComment(postId, content, user_id, parentId, created_at) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const commentCollection = db.collection('comment'); // Thay đổi tên collection cho bảng comment của bạn

        // Tạo comment mới
        const comment = {
            post_id: postId,
            content,
            user_id,
            parentId,
            created_at
        };

        // Thêm comment vào cơ sở dữ liệu
        const result = await commentCollection.insertOne(comment);
        console.log(result);

        // Trả về comment đã được thêm vào cơ sở dữ liệu
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
