import React, { useState } from "react";

const Search = ({ onSearch, menus }) => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedMenus, setSelectedMenus] = useState([]);

    const handleOnChange = (e) => {
        const newValue = e.target.value;
        setSearchValue(newValue);
    };

    const handleMenuSelect = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedMenus((prevMenus) => [...prevMenus, value]);
        } else {
            setSelectedMenus((prevMenus) => prevMenus.filter((menu) => menu !== value));
        }
    };

    const renderMenus = (menus) => {
        return menus.map((menu) => (
            <div key={menu._id}>
                <label>
                    <input
                        type="checkbox"
                        value={menu._id}
                        onChange={handleMenuSelect}
                        checked={selectedMenus.includes(menu._id)}
                    />
                    {menu.title}
                </label>
                {menu.children && menu.children.length > 0 && renderMenus(menu.children)}
            </div>
        ));
    };

    const handleSearch = () => {
        onSearch(searchValue, selectedMenus);
    };

    return (
        <div>
            <input
                type="text"
                name="search"
                onChange={handleOnChange}
                value={searchValue}
                placeholder="Search anything here"
            />

            <div>
                <h4>Menus:</h4>
                {renderMenus(menus)}
            </div>

            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;
