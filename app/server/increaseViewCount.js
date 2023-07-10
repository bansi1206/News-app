const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function increaseViewCount(postId, timestamp, viewerIp) {
    try {
        // Kết nối tới cơ sở dữ liệu MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const collection = client.db('News').collection('post');

        await collection.updateOne(
            { _id: new ObjectId(postId) },
            { $inc: { viewCount: 1 } }
        );

        await client.db('News').collection('views').insertOne({
            postId: new ObjectId(postId),
            timestamp,
            viewerIp,
        });

        console.log('View count increased for post:', postId);
    } catch (error) {
        throw error;
    }
}

module.exports = { increaseViewCount };
