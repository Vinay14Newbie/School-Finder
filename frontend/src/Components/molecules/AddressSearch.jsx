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
    setSuggestions(results?.data);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />
      {suggestions?.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded-lg mt-2 shadow-md max-h-56 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              className="p-3 hover:bg-blue-50 cursor-pointer transition text-gray-700 border-b last:border-none"
              onClick={() => {
                onSelectAddress(item);
                setQuery(item.display_name);
              }}
            >
              📌 {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
