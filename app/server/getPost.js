const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function getPosts() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const postCollection = db.collection('post');
        const menuItemCollection = db.collection('menu item');
        const commentCollection = db.collection('comment');

        const posts = await postCollection.find().toArray();


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
