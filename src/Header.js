import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './redro.svg';
import search from './search.svg';
import catalog from './catalog.svg';
import profile from './profile.svg';
import vedro from './vedro.svg';
import like from './like.svg';
import axios from 'axios';
import CategoryDropdown from './Dropdown';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dataCategory, setDataCategory] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false); 
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/product?text=${encodeURIComponent(searchQuery)}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products-categories/get-categories`,
      );
      setDataCategory(response.data.payload.content);
    } catch (error) {
      console.error('Error occurred during fetching categories:', error);
    }
  };

  const openCatalog = () => {
    fetchCategories();
    setDropdownVisible(!dropdownVisible); 
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="Logo" style={styles.logo} />
        </Link>
      </div>
      <div style={styles.centerContainer}>
        <button onClick={openCatalog} style={styles.button}>
          <img src={catalog} alt="Catalog Icon" />
        </button>
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.button}>
            <img src={search} alt="Search Icon" />
          </button>
        </div>
      </div>
      <nav style={styles.nav}>
        <Link to="/profile" style={styles.link}>
          <img src={profile} alt="Profile Icon" style={styles.logo} />
        </Link>
        <Link to="/like" style={styles.link}>
          <img src={like} alt="Like Icon" style={styles.logo} />
        </Link>
        <Link to="/cart" style={styles.link}>
          <img src={vedro} alt="Cart Icon" style={styles.logo} />
        </Link>
      </nav>
      {dropdownVisible && (
        <div style={styles.dropdownContainer}>
          <CategoryDropdown categories={dataCategory} isOpen={dropdownVisible}/>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: 'white',
    padding: '10px 5%',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000',
    boxSizing: 'border-box',
  },
  logoContainer: {
    flex: '0 0 auto',
  },
  logo: {
    height: '40px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '1em',
    height: '40px',
    width: '100%',
  },
  button: {
    padding: '0 10px',
    marginLeft: '10px',
    marginRight: '10px',
    height: '40px',
    cursor: 'pointer',
    backgroundColor: 'red',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '1.2em',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '100%',
    zIndex: '1000',
  },
  '@media (max-width: 768px)': {
    header: {
      padding: '10px 2%',
    },
    logo: {
      height: '30px',
    },
    searchContainer: {
      width: '100%',
      maxWidth: '100%',
    },
  },
};

export default Header;
