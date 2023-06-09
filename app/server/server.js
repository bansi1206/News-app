const express = require('express');
const { authenticate, getUserById } = require('./auth');
const cors = require('cors');
const { getPosts } = require('./getPost');
const { getPostById } = require('./getPostById');
const { getMenuData } = require('./getMenuData');
const { getPostByMenu } = require('./getPostByMenu');
const { getCommentsByPostId } = require('./getCommentsByPostId');
const { addComment } = require('./addComment');
const { updateComment } = require('./updateComment');
const { deleteComment } = require('./deleteComment');
const { addUser, checkValidate } = require('./addUser');
const { updateUser } = require('./updateUser');
const multer = require('multer');

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

// Tạo storage cho Multer
// Định nghĩa storage cho multer

app.use('/avatar', express.static('public/avatar'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public/avatar/'); // Thay đổi đường dẫn tới thư mục avatar
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname;
        cb(null, fileName);
    }
});

// Khởi tạo multer với storage
const upload = multer({ storage: storage });

app.post('/api/updateUser/:id', upload.single('avatar'), async (req, res) => {
    const { id } = req.params;
    const { newPassword, email } = req.body;
    let avatarPath = null;

    // Kiểm tra xem người dùng đã tải lên avatar mới hay chưa
    if (req.file) {
        avatarPath = `/avatar/${req.file.filename}`; // Đường dẫn avatar mới
    }

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Kiểm tra xem có sự thay đổi thông tin người dùng hay không
        const hasChanges = newPassword || email || avatarPath;

        if (hasChanges) {
            // Có sự thay đổi, cập nhật thông tin người dùng
            await updateUser(id, newPassword, email, avatarPath);
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});






app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
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

app.get('/comments/:postId', async (req, res) => {
    const postId = req.params.postId;

    try {
        const comments = await getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (error) {
        console.log('Error fetching comments:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/comments', async (req, res) => {
    const { postId, content, user_id, parentId, created_at } = req.body;

    try {
        // Gọi hàm addComment để thêm comment vào cơ sở dữ liệu
        const newComment = await addComment(postId, content, user_id, parentId, created_at);

        res.status(201).json(newComment);
    } catch (error) {
        console.log('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

app.put('/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const updatedFields = req.body;

    try {
        await updateComment(commentId, updatedFields);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.sendStatus(500);
    }
});

app.delete('/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;

    try {
        await deleteComment(commentId);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.sendStatus(500);
    }
});



app.listen(3001, () => {
    console.log('Server started on port 3001');
});
