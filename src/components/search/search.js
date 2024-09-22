import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../config';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract the search term from the URL
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Make a POST request to the API with the search keyword
        const response = await axios.post(`${BASE_URL}/api/searchProducts`, { keyword });
        setResults(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="trending-products">
      <h1>Search Results for "{keyword}"</h1>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.ProductId}>
                 <div className="search-images-column">
                 <img src={`${BASE_URL}/${result.imageUrl}`} alt={result.ProductName} className="small-image" />
                 </div>
              <p>{result.ProductName}</p>
              <p>{result.description}</p>
              <p>{result.price}</p>
              <p>{result.image2}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
