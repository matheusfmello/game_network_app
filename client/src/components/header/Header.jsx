import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

import searchLogo from '../../assets/search-svgrepo-com.svg';

const Header = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="header">
        <div className='header-content'>
        <Link to ="/">
          <h1>gamesConnection</h1>
        </Link>
        <nav className="nav-links">
          <Link to='/account'>Account</Link>
          <Link to='/games'>Games</Link>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <img src={searchLogo} alt="Search" />
        </div>
      </div>
    </div>
  );
};

export default Header;