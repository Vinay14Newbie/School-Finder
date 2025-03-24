import React, { useState } from 'react';
import { AddressSearch } from './AddressSearch';
import { postSchool } from '../../apis/apis.js';

export const AddSchoolForm = () => {
  const [schoolName, setSchoolName] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!schoolName || !selectedAddress) {
      setMessage('Please enter school name and select an address.');
      return;
    }

    const response = await postSchool(
      schoolName,
      selectedAddress.display_name,
      selectedAddress.lat,
      selectedAddress.lon
    );
    if (response) {
      setMessage('School added successfully!');
      setSchoolName('');
      setSelectedAddress(null);
    } else {
      setMessage('Failed to add school.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Add a School</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter school name"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <AddressSearch
          placeholder="Enter school address..."
          onSelectAddress={setSelectedAddress}
        />
        {selectedAddress && (
          <p className="mt-2 text-sm text-green-600">
            Selected: {selectedAddress.display_name}
          </p>
        )}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add School
        </button>
      </form>
      {message && <p className="mt-2 text-center text-red-500">{message}</p>}
    </div>
  );
};
