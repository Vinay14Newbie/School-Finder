# School Management System API

A simple Node.js and MySQL-based API to manage school data, allowing users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

---

## **Features**

✅ Add new schools with name, address, latitude, and longitude.  
✅ Retrieve a list of schools sorted by distance from the user’s location.  
✅ Input validation for data integrity.  
✅ Efficient distance calculation using the Haversine formula.

---

## **Tech Stack**

- **Node.js** – Backend framework
- **Express.js** – Web server
- **MySQL** – Relational database
- **dotenv** – For environment variable management

---

## 🛠️ **Installation and Setup**

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/school-management.git
cd school-management
```

### 2. **Install Dependencies**

```bash
    npm install
```

### 3. **Create .env File**

```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=school_db
    PORT=5000
```

### 4. **Set Up MySQL Database**

```bash
    CREATE DATABASE school_db;

    USE school_db;

    CREATE TABLE schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
    );

```

### 5. **Start the server**

```bash
    npm start
```

## API Endpoints

1. Add School

   URL: /addSchool

   Method: POST

Request Body:

```json
{
  "name": "ABC School",
  "address": "123 Main St",
  "latitude": 12.345,
  "longitude": 67.89
}
```

Response:

```json
{
  "message": "School added successfully",
  "school": {
    "id": 1,
    "name": "ABC School",
    "address": "123 Main St",
    "latitude": 12.345,
    "longitude": 67.89
  }
}
```

2. List Schools

URL: /listSchools?latitude=12.345&longitude=67.89

Method: GET

Response:

```json
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "123 Main St",
    "latitude": 12.345,
    "longitude": 67.89,
    "distance": 0.0
  }
]
```
