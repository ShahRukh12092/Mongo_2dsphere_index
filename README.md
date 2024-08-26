# Mongo 2dsphere Index API

This project demonstrates how to use MongoDB's **2dsphere** index for geospatial queries, such as finding locations within a polygon or a circle. It's built using Node.js, Express, and Mongoose.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Add Location](#add-location)
  - [Find Locations Within a Polygon](#find-locations-within-a-polygon)
  - [Find Nearest spot](#nearest-spot)
  - [Find Locations Within a Circle](#find-locations-within-a-circle)
- [Contributing](#contributing)

## Features
- **Geospatial Data**: Add locations (points with coordinates) to MongoDB.
- **Polygon Queries**: Find locations within a specific polygon.
- **Circle Queries**: Find locations within a circle of a given radius.

## Installation

### Prerequisites
- **Node.js**: Make sure Node.js is installed on your machine.
- **MongoDB**: Set up a MongoDB instance.

### Steps

1. **Clone the repository**:
   ```bash
   git clone git@github-srk:ShahRukh12092/Mongo_2dsphere_index.git


2. **Navigate to the project directory**:
   ```bash
   cd Mongo_2dsphere_index
   
3. **Install dependencies**:
   ```bash
   npm install
4. **Configure MongoDB connection: Edit the MongoDB connection string in config/db.js if necessary.**
5. **Run the server**:
   ```bash
   npm run dev
## API Endpoints

### 1. Add Location

- **Endpoint**: `/api/locations`
- **Method**: `POST`
- **Description**: Adds a new location with its coordinates.

***Example request***:
```bash
curl -X POST http://localhost:3000/api/locations \
-H 'Content-Type: application/json' \
-d '{
  "name": "Sample Location",
  "location": {
    "type": "Point",
    "coordinates": [-73.856077, 40.848447]
  }
}'
```
### 2. Find Locations Within a Polygon

- **Endpoint**: `/api/locations/within-polygon`
- **Method**: `GET`
- **Description**: Finds locations within a specified polygon.
- **Query Parameters**:
  - `polygon`: list of coordinates 

**Example request**:
```bash
curl -X GET "http://localhost:3000/api/locations/within-polygon?polygon=[[-74.01546610984953, 40.82619466881925], [-74.03021716978401, 40.775089966438436], [-74.003608901985, 40.76003158561154], [-73.95983072463424, 40.75874528248685], [-73.96772188832983, 40.787856698002145], [-74.01546610984953, 40.82619466881925]]"
```
### 3. Find Nearest spot

- **Endpoint**: `/api/locations/nearest`
- **Method**: `GET`
- **Description**: Finds locations within a specified polygon.
- **Query Parameters**:
  - latitude: Latitude of the point.
  - longitude: Longitude of the point.

**Example request**:
```bash
curl -X GET "http://localhost:3000/api/locations/nearest?latitude=74.26427656853268&longitude=31.4697766125898"
```
### 4. Find Locations Within a Circle

- **Endpoint**: `/api/locations/within-circle`
- **Method**: `GET`
- **Description**: Finds locations within a circle defined by center coordinates and radius.
- **Query Parameters**:
  - latitude: Latitude of the circle's center.
  - longitude: Longitude of the circle's center.
  - radius: Radius of the circle (in meters).

**Example request**:
```bash
curl -X GET "http://localhost:3000/api/locations/within-circle?latitude=40.785091&longitude=-73.968285&radius=1000"
```
## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.
