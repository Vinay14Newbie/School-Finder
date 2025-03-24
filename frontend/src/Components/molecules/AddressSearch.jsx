import React, { useState } from 'react';
import { searchAddress } from '../../apis/apis.js';

export const AddressSearch = ({ onSelectAddress, placeholder }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    const results = await searchAddress(value);
    setSuggestions(results);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      {suggestions.length > 0 && (
        <ul className="bg-white border border-gray-200 rounded-lg mt-2">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectAddress(item)}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
