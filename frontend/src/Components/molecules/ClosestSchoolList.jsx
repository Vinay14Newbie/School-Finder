import React, { useState } from 'react';
import { getClosestSchools } from '../../apis/apis';
import { AddressSearch } from './AddressSearch';

export const ClosestSchoolList = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [schools, setSchools] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Number of schools per page

  const fetchClosestSchools = async (address, newPage = 1) => {
    setSelectedAddress(address);

    const result = await getClosestSchools({
      latitude: address.lat,
      longitude: address.lon,
      page: newPage,
      limit
    });

    setSchools(result?.data);
    setTotalPages(result?.totalPages);
    setPage(newPage);
  };

  return (
    <div className="max-w-full flex flex-col lg:flex-row gap-x-10 items-center justify-center">
      <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Find Closest Schools
        </h2>
        <AddressSearch
          placeholder="Search for an address..."
          onSelectAddress={(address) => fetchClosestSchools(address, 1)}
        />
        {selectedAddress && (
          <p className="mt-4 text-sm text-blue-600 font-medium text-center">
            ✅ Selected: {selectedAddress.display_name}
          </p>
        )}
      </div>
      <div>
        {schools?.length > 0 && (
          <>
            <ul className="mt-4 space-y-3">
              {schools.map((school, index) => (
                <li
                  key={index}
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm text-center font-medium text-gray-700 hover:bg-blue-100 transition"
                >
                  {school.name} -{' '}
                  <span className="text-blue-600">
                    {school.distance.toFixed(3)} km away
                  </span>
                </li>
              ))}
            </ul>

            {/* Pagination Buttons */}
            <div className="flex justify-between mt-4">
              <button
                disabled={page === 1}
                onClick={() => fetchClosestSchools(selectedAddress, page - 1)}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  page === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => fetchClosestSchools(selectedAddress, page + 1)}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  page === totalPages
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
