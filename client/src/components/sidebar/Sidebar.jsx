import React, { useState } from  'react';
import {Link} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({isSidebarExpanded, handleExpandSidebarButton}) => {

    const [searchText, setSearchText] = useState("");


    function handleSearchText() {
        return;
    };

    return (
        <div className={`sidebar ${isSidebarExpanded ? 'expanded':'minimized'}`}>
            <button onClick={handleExpandSidebarButton}>
                {isSidebarExpanded ? "<<": ">>"}
            </button>
            <div className='search-container'>
                <input
                    type="text"
                    placeholder='Search...'
                    value={searchText}
                />
            </div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to={`/account`}>Account</Link></li>
                <li><Link to="/games">Games</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;