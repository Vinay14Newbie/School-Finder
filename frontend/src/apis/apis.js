import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000'; // Update with actual backend URL

export const searchAddress = async (query) => {
  if (query.length < 3) return [];
  try {
    const response = await axios.get(
      `https://geocode.maps.co/search?q=${encodeURIComponent(query)}&api_key=${
        import.meta.env.VITE_MAP_API_KEY
      }`
    );
    return { data: response?.data, totalPages: response?.data?.totalPages };
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
    return { data: [], totalPages: 0 };
  }
};

export const getClosestSchools = async ({
  latitude,
  longitude,
  page = 1,
  limit = 5
}) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/listSchools`, {
      params: { latitude, longitude, page, limit }
    });

    return response?.data;
  } catch (error) {
    console.error('Error fetching closest schools:', error);
    return [];
  }
};

export const postSchool = async (name, address, lat, lon) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/addSchool`, {
      name,
      address,
      latitude: lat,
      longitude: lon
    });
    return response.data;
  } catch (error) {
    console.error('Error posting school:', error);
    return null;
  }
};
