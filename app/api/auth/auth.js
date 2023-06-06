const { client } = require('../../server/db');

// Kiểm tra tên người dùng và mật khẩu
async function authenticate(username, password) {
    try {
        // Kết nối tới cơ sở dữ liệu MongoDB
        await client.connect();
        console.log("Connected to MongoDB")

        const collection = client.db('News').collection('user'); // Thay đổi thành tên collection của bạn
        const user = await collection.findOne({ username });
        console.log(user)

        if (user) {
            if (user.password === password) {
                return { success: true, user: { id: user.id, name: user.name } };
            } else {
                return { success: false, message: 'Incorrect password' };
            }
        } else {
            return { success: false, message: 'User not found' };
        }

    } catch (error) {
        console.log('Error authenticating user', error);
        return { success: false, message: 'Error authenticating user' };
    }
}

module.exports = { authenticate };
