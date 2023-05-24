const express = require('express');
const { authenticate } = require('./auth');
const cors = require('cors');

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

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
