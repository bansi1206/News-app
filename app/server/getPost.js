const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getPosts() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const postCollection = db.collection('post'); // Thay đổi tên collection của bạn
        const menuItemCollection = db.collection('menu item'); // Thay đổi tên collection của bạn
        const commentCollection = db.collection('comment');

        const posts = await postCollection.find().toArray();

        // Lấy thông tin menu item và gắn vào từng bài viết
        for (const post of posts) {
            const menuItem = await menuItemCollection.findOne({ _id: new ObjectId(post.menu_item_id) });
            if (menuItem) {
                post.menu = menuItem.title;
            }
            const commentCount = await commentCollection.countDocuments({ post_id: post._id.toString() });
            post.commentCount = commentCount;
        }

        console.log(posts)

        return posts;
    } catch (error) {
        console.log('Error fetching posts:', error);
        throw error;
    }
}

module.exports = { getPosts };
