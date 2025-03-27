# Nearest School Finder

A Web Application that allow users to search for schools using near a given address.The system fetches school data from a database, sorts them by proximity using Haversine formula, and displays paginated results. It also allow users to add new schools.

---

## Features

- **Search for an address** using an external API, which provides latitude and longitude for accurate location selection.
- **Find nearest schools** using Haversine formula based on user's location.
- **Paginated results** for better performance and user experience.
- **Responsive UI** for desktop and mobile screens.
- **Backend API** with optimized queries for fetching schools.

---

## Tech Stack

### **Frontend:**

- React.js
- Tailwind CSS

### **Backend:**

- Node.js
- MySQL
- Express.js

### **External API:**

- Location search API for address suggestions. [Geocoding](https://geocode.maps.co/)

## How It Works

1. Address Search

   - As users type an address, an API fetches location suggestions.
   - The selected address provides latitude and longitude for accurate school searches.

2. Fetching Schools

   - The backend retrieves a list of schools from the database based on latitude and longitude.
   - Schools are sorted by proximity using the Haversine formula for accurate distance calculation.
   - Results are paginated for a smooth browsing experience.

3. Displaying Schools
   - The UI presents schools in order of proximity.
   - Users can navigate between pages to view more results.

---

## 🛠️ Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/School-Management-System-API.git
cd school-management
```

## 1. Backend Setup

```bash
    cd backend
```

### 2. Install Dependencies

```bash
    npm install
```

### 3. Create .env File

```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=school_db
    PORT=5000
```

### 4. Set Up MySQL Database

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

### 5. Start the server

```bash
    npm start
```

## 1. Frontend Setup

```bash
    cd frontend
```

### 2. Install dependencies

```bash
    npm install
```

### 3. Create .env file

Generate the api key from [here](https://geocode.maps.co/) and set up your Geocoding API key

```bash
    VITE_MAP_API_KEY='your_api_key'
```

### 4. Start the frontend server

```bash
    npm run dev
```

The frontend will be available at http://localhost:5173/.
