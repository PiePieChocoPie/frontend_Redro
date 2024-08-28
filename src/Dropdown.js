import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubCategoryItem = ({ item }) => {
    const navigate = useNavigate();
    const handleItemClick = () => {
        console.log(`SubCategory Item ID: ${item.id}`);
        navigate(`/product?categories=${item.id}&page=1`);
    };

    return (
        <li
            style={{
                ...styles.subCategoryItem,
            }}
            onClick={handleItemClick}
        >
            {item.name.ru}
        </li>
    );
};

const SubCategory = ({ category }) => {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        console.log(`SubCategory ID: ${category.id}`);
        navigate(`/product?categories=${category.id}&page=1`);
    };

    return (
        <div style={{...styles.subCategory,}}>
            <h3
                style={{
                    ...styles.subCategoryTitle,
                    paddingTop: category.children.length === 0 ? '0' : '0',
                }}
                onClick={handleCategoryClick}
            >
                {category.name.ru}
            </h3>
            {category.children.length > 0 && (
                <ul style={styles.subCategoryList}>
                    {category.children.map((item) => (
                        <SubCategoryItem key={item.id} item={item} />
                    ))}
                </ul>
            )}
        </div>
    );
};

const CategoryDropdown = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const navigate = useNavigate();

    const handleCategoryMouseEnter = (category) => {
        setSelectedCategory(category);
        setHoveredCategory(category.id); // Установим ID текущей категории при наведении
    };

    const handleCategoryMouseLeave = () => {
        setHoveredCategory(null); // Сбросим состояние при уходе курсора
    };

    const handleCategoryClick = (category) => {
        console.log(`Category ID: ${category.id}`);
        navigate(`/product?categories=${category.id}&page=1`);
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return (
        <div style={styles.container}>
            <div style={styles.categoryList}>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        style={{
                            ...styles.categoryButton,
                            ...(hoveredCategory === category.id ? styles.categoryButtonHover : {}),
                        }}
                        onMouseEnter={() => handleCategoryMouseEnter(category)}
                        onMouseLeave={handleCategoryMouseLeave}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div style={styles.categoryContent}>
                            <img
                                src={`${process.env.REACT_APP_CDN_SERVER_API_URL}${category.mainImage?.small?.url}`}
                                alt={category.name.ru}
                                style={styles.categoryIcon}
                            />
                            <span style={styles.categoryText}>
                                {truncateText(category.name.ru, 18)}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <div style={styles.subCategoryContainer}>
                {selectedCategory && (
                    <div style={styles.subCategoryWrapper}>
                        {selectedCategory.children.map((subCategory) => (
                            <SubCategory key={subCategory.id} category={subCategory} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '10px 5%',
        borderBottomLeftRadius: '35px', 
        borderBottomRightRadius: '35px', 
        backgroundColor:'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    categoryList: {
        marginRight: '20px',
        maxHeight: '800px',
        overflowY: 'auto',
        width: '200px',
    },
    categoryButton: {
        display: 'block',
        padding: '10px',
        color: 'black',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    },
    categoryButtonHover: {
        backgroundColor: '#f0f0f0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    categoryContent: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    categoryIcon: {
        width: '32px',
        height: '32px',
        marginRight: '10px',
        borderRadius: '10px',
    },
    categoryText: {
        fontSize: '16px',
        color: 'black',
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        textOverflow: 'ellipsis', 
        maxWidth: '200px', 
    },
    subCategoryContainer: {
        flex: 1,
        maxWidth: 'calc(100% - 220px)',
        overflowY: 'auto',
    },
    subCategoryWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
    },
    subCategory: {
        width: 'calc(25% - 20px)',
        boxSizing: 'border-box',
        cursor: 'pointer',
    },
    subCategoryTitle: {
        marginBottom: '10px',
        fontSize: '18px',
        cursor: 'pointer',
        color: 'black',
    },
    subCategoryList: {
        listStyleType: 'none',
        padding: '0',
        cursor: 'pointer',
        margin: '0',
        color: 'black',
    },
    subCategoryItem: {
        cursor: 'pointer',
        padding: '5px 0',
    },
};

export default CategoryDropdown;
