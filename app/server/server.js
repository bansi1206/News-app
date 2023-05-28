const express = require('express');
const { authenticate } = require('./auth');
const cors = require('cors');
const { getPosts } = require('./getPost');
const { getPostById } = require('./getPostById');

// Sử dụng middleware cors

const app = express();

app.use(express.json());

app.use(cors());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authenticate(username, password);

    if (result.success) {
        res.status(200).json({ message: result.message });
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



app.listen(3001, () => {
    console.log('Server started on port 3001');
});
