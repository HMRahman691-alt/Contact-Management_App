import { useState, useEffect } from 'react';
import '../css/SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search contact"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      <button className="search-btn">Search</button>
    </div>
  );
}

export default SearchBar;