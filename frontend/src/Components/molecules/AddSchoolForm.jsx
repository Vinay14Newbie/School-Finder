import React, { useState } from 'react';
import { AddressSearch } from './AddressSearch';
import { postSchool } from '../../apis/apis.js';

export const AddSchoolForm = ({ onClose }) => {
  const [schoolName, setSchoolName] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!schoolName || !selectedAddress) {
      setMessage('⚠️ Please enter school name and select an address.');
      return;
    }

    const response = await postSchool(
      schoolName,
      selectedAddress.display_name,
      selectedAddress.lat,
      selectedAddress.lon
    );

    if (response) {
      setMessage('✅ School added successfully!');
      setSchoolName('');
      setSelectedAddress(null);
      setTimeout(() => onClose(), 1000); // Close modal after success
    } else {
      setMessage('❌ Failed to add school.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Add a School
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter school name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition"
          />
          <AddressSearch
            placeholder="Enter school address..."
            onSelectAddress={setSelectedAddress}
          />
          {selectedAddress && (
            <p className="mt-2 text-sm text-green-600 text-center">
              ✅ Selected: {selectedAddress.display_name}
            </p>
          )}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Add School
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-2 text-center font-medium text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};
