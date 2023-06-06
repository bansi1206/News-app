const express = require('express');
const { authenticate } = require('./auth');
const cors = require('cors');
const { getPosts } = require('./getPost');
const { getPostById } = require('./getPostById');
const { getMenuData } = require('./getMenuData');
const { getPostByMenu } = require('./getPostByMenu');



// Sử dụng middleware cors

const app = express();

app.use(express.json());

app.use(cors());




app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authenticate(username, password);

    if (result.success) {
        const { id, name } = result.user;

        // Gửi thông tin người dùng trong phản hồi JSON
        res.status(200).json({ id, name });
    } else {
        res.status(401).json({ message: result.message });
    }
});


app.get('/post/:id', async (req, res) => {
    const postId = req.params.id;


    try {
        const post = await getPostById(postId);
        res.json(post);
    } catch (error) {
        console.log('Error fetching post:', error);
        res.status(500).json({ error: 'Error fetching post' });
    }
});


app.get('/post', async (req, res) => {
    try {
        const posts = await getPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.log('Error fetching posts:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/menu', async (req, res) => {
    try {
        const menuData = await getMenuData();
        res.json(menuData);
    } catch (error) {
        console.log('Error fetching menu data:', error);
        res.status(500).json({ error: 'Error fetching menu data' });
    }
});



app.get('/postByMenu/:menuItemId', async (req, res) => {
    const menuItemId = req.params.menuItemId;

    try {
        const posts = await getPosts();
        const filteredPosts = await getPostByMenu(posts, menuItemId);

        res.status(200).json(filteredPosts);
    } catch (error) {
        console.log('Error fetching posts by menu item:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get("/searchPosts", async (req, res) => {
    const { searchValue, selectedMenus } = req.query;

    try {
        const posts = await getPosts();
        let filteredPosts = posts;

        // Tìm kiếm theo tên
        if (searchValue) {
            const searchTerm = searchValue.toLowerCase();
            filteredPosts = filteredPosts.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchTerm) ||
                    post.content.toLowerCase().includes(searchTerm)
            );
        }

        // Lọc theo menu đã chọn
        if (selectedMenus && selectedMenus.length > 0) {
            filteredPosts = filteredPosts.filter((post) => {
                return selectedMenus.includes(post.menu_id) || selectedMenus.includes(post.menu_item_id);
            });
        }

        res.status(200).json(filteredPosts);
    } catch (error) {
        console.log("Error searching posts:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});




app.listen(3001, () => {
    console.log('Server started on port 3001');
});
