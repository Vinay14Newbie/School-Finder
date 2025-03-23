### 1. Add School

This endpoint allows you to add a new school to the system.

#### Request Body Parameters

- `name` (text): The name of the school.
- `address` (text): The address of the school.
- `latitude` (text): The latitude coordinates of the school location.
- `longitude` (text): The longitude coordinates of the school location.

#### Response

Upon a successful request, the API returns a status code of 201 and a JSON object with the following structure:

```json
{
  "message": "",
  "school": {
    "id": 0,
    "name": "",
    "address": "",
    "latitude": "",
    "longitude": ""
  }
}
```

### 2. Get List of Schools

This endpoint retrieves a list of schools based on the provided latitude and longitude coordinates.

#### Request

- Method: GET
- URL: `{{deployed_server}}/listSchools`

- Query Parameters:
  - latitude (number): The latitude coordinate for the location
  - longitude (number): The longitude coordinate for the location

#### Response

- Status: 200
- Content-Type: application/json

##### Response Body

```json
{
  "message": "",
  "data": [
    {
      "id": 0,
      "name": "",
      "address": "",
      "latitude": 0,
      "longitude": 0,
      "distance": 0
    }
  ]
}
```

The response contains a message and an array of school data objects, each including an ID, name, address, latitude, longitude, and distance from the provided coordinates.
