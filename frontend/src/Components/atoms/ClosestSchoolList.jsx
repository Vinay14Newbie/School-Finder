import React, { useState } from 'react';
import { getClosestSchools } from '../../apis/apis';
import { AddressSearch } from '../molecules/AddressSearch';

export const ClosestSchoolList = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [schools, setSchools] = useState([]);

  const fetchClosestSchools = async (address) => {
    setSelectedAddress(address);

    const results = await getClosestSchools({
      latitude: address.lat,
      longitude: address.lon
    });
    setSchools(results);
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Find Closest Schools</h2>
      <AddressSearch
        placeholder="Search for an address..."
        onSelectAddress={fetchClosestSchools}
      />
      {selectedAddress && (
        <p className="mt-2 text-sm text-green-600">
          Selected: {selectedAddress.display_name}
        </p>
      )}
      {schools.length > 0 && (
        <ul className="mt-4 space-y-2">
          {schools.map((school, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded-lg shadow-sm text-center"
            >
              {school.name} - {school.distance} km away
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
