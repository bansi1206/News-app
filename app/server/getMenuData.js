const { client } = require('./db');

async function getMenuData() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News'); // Thay đổi tên database của bạn
        const menuCollection = db.collection('menu'); // Thay đổi tên collection cho bảng menu của bạn
        const menuItemCollection = db.collection('menu item'); // Thay đổi tên collection cho bảng menu item của bạn

        // Lấy dữ liệu từ bảng menu
        const menuData = await menuCollection.find().toArray();

        // Lấy dữ liệu từ bảng menu item
        const menuItemData = await menuItemCollection.find().toArray();

        // Kết nối dữ liệu menu và menu item theo trường menu_id
        const menuMap = new Map();

        menuData.forEach(menu => {
            const { _id } = menu;
            menuMap.set(_id.toString(), { ...menu, children: [] });
        });

        menuItemData.forEach(menuItem => {
            const { menu_id } = menuItem;
            const parentMenu = menuMap.get(menu_id.toString());
            if (parentMenu) {
                parentMenu.children.push(menuItem);
            }
        });

        // Trả về dữ liệu menu và menu item đã được kết nối
        return [...menuMap.values()];
    } catch (error) {
        console.log('Error fetching menu data:', error);
        throw error;
    }
}

module.exports = { getMenuData };
