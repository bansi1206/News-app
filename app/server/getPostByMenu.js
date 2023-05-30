const { client } = require('./db');


async function getPostByMenu(posts, menuItemId) {
    try {
        const filteredPosts = posts.filter((post) => {
            if (post.menu_id === menuItemId) {
                return true;
            } else if (post.menu_item_id === menuItemId) {
                return true;
            } else {
                return false;
            }
        });

        return filteredPosts;
    } catch (error) {
        console.log('Error fetching posts by menu item:', error);
        throw error;
    }
}


module.exports = { getPostByMenu };
