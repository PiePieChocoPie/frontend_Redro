import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Компонент карточки товара
const ProductCard = ({ product }) => (
  <div style={styles.card}>
    <div style={styles.imageContainer}>
      {product.gallery && product.gallery.length > 0 && product.gallery[0].medium ? (
        <img
          src={`${process.env.REACT_APP_CDN_SERVER_API_URL}${product.gallery[0].medium.url}`}
          alt={product.name}
          style={styles.image}
        />
      ) : (
        <div style={styles.noImage}>Image not available</div>
      )}
    </div>
    <h2 style={styles.title}>{product.name}</h2>
    <p style={styles.price}>Цена: {product.price} RUB</p>
    <p style={styles.unit}>Единица измерения: {product.properties.unit[0].name}</p>
    <p style={styles.reward}>Бонусные баллы: {product.reward}</p>
  </div>
);

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categories = query.get('categories') || '';
  const text = query.get('text') || '';
  const page = query.get('page') || 1;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token is missing');

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/products-search`,
        {},
        {
          params: {
            limit: 20,
            page,
            text,
            categories,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.payload.content.products);
    } catch (err) {
      console.error('Error occurred during fetching products:', err);
      setError('Error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categories, text, page]);

  return (
    <div style={styles.scrollContainer}>
      <div style={styles.container}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  scrollContainer: {
    height: '80vh',
    overflowY: 'auto',
    padding: '10px 5%',
    backgroundColor: '#F6F6F6',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '20px',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '250px', // Ограничение высоты карточки
  },
  imageContainer: {
    width: '100%',
    paddingBottom: '75%', // Изменяем соотношение сторон
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  noImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#e0e0e0',
    color: '#9e9e9e',
    fontSize: '0.9em',
  },
  title: {
    fontSize: '1.1em',
    margin: '10px 0',
    overflow: 'hidden', // Добавляем для предотвращения переполнения
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  price: {
    fontSize: '1em',
    color: '#e91e63',
    fontWeight: 'bold',
  },
  unit: {
    fontSize: '0.9em',
    color: '#555',
  },
  reward: {
    fontSize: '0.9em',
    color: '#4CAF50',
  },
};

export default ProductPage;
