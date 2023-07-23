const { client } = require('./db');

async function getMenuData() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('News');
        const menuCollection = db.collection('menu');
        const menuItemCollection = db.collection('menu item');


        const menuData = await menuCollection.find().toArray();


        const menuItemData = await menuItemCollection.find().toArray();


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


        return [...menuMap.values()];
    } catch (error) {
        console.log('Error fetching menu data:', error);
        throw error;
    }
}

module.exports = { getMenuData };
