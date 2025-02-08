import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
interface ProductArray {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  thumb: string;
  images: string[]; // assuming images are strings
  price: number | null; // assuming price can be null
  unit: string;
  is_featured: number;
  is_offered: number;
  category_id: number;
  user_id: number;
  status: string;
}
const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search-key'); // Get the 'query' parameter from URL
  const [products, setProducts] = useState<ProductArray[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (query) {
          const response = await axios.get(config.apiUrl + 'product', {
            params: { 'search-key': query, size: 100, page: 1 },
          });
          if (response.status === 200) {
            setProducts(response.data.data.data);
          } else {
            console.error('Failed to fetch product data');
          }
        } else {
          console.warn('No query provided');
          setProducts([]); // Clear the results if no query is provided
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData(); // Call the function whenever 'query' changes
  }, [query]); // 'query' is a dependency for the useEffect

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Search;
