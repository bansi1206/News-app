const { client } = require('./db');

async function updateComment(commentId, updatedFields) {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const commentCollection = db.collection('comment'); // Thay đổi tên collection cho bảng comment của bạn

        // Cập nhật các trường được chỉ định trong updatedFields
        const updateQuery = { $set: updatedFields };

        // Cập nhật comment trong cơ sở dữ liệu
        await commentCollection.updateOne({ _id: commentId }, updateQuery);

        console.log('Comment updated successfully');
    } catch (error) {
        console.log('Error updating comment:', error);
        throw error;
    }
}

module.exports = { updateComment };
