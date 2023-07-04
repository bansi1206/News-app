const { client } = require('./db');
const { ObjectId } = require('mongodb');


async function getPostById(postId) {
    try {
        await client.connect();
        console.log(postId)

        const db = client.db('News');
        const collection = db.collection('post');
        const menuItemCollection = db.collection('menu item');

        const post = await collection.findOne({ _id: new ObjectId(postId) });
        const menuItem = await menuItemCollection.findOne({ _id: new ObjectId(post.menu_item_id) });
        if (menuItem) {
            post.menu = menuItem.title;
        }
        console.log(post);

        return post;
    } catch (error) {
        console.log('Error fetching post:', error);
        throw error;
    }
}

module.exports = { getPostById };
