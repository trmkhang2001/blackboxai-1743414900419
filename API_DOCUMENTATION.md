# Cinema Booking System API Documentation

## Base URL
`http://localhost:8000/api`

## Authentication
All endpoints except `/auth/login` and `/auth/register` require JWT authentication.

## API Endpoints

### Authentication

#### Login
- **Endpoint**: `/auth/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "token": "jwt_token",
    "role": "user",
    "email": "user@example.com"
  }
  ```

#### Register
- **Endpoint**: `/auth/register` 
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123",
    "phone": "0123456789"
  }
  ```

### Movies

#### Get All Movies
- **Endpoint**: `/movies`
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Movie Title",
      "description": "Movie description",
      "duration": 120,
      "posterUrl": "/posters/1.jpg"
    }
  ]
  ```

### Bookings

#### Create Booking
- **Endpoint**: `/bookings`
- **Method**: POST
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Request Body**:
  ```json
  {
    "showId": 1,
    "seatNumber": "A1",
    "totalPrice": 100000
  }
  ```

#### Get User Bookings
- **Endpoint**: `/bookings/user`
- **Method**: GET  
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "showId": 1,
      "seatNumber": "A1",
      "status": "confirmed"
    }
  ]
  ```

### Staff Endpoints

#### Get All Tickets (Staff)
- **Endpoint**: `/bookings/staff/all`
- **Method**: GET
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Required Role**: staff or manager

#### Update Ticket Status
- **Endpoint**: `/bookings/:id/status`
- **Method**: PUT
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Required Role**: staff or manager
- **Request Body**:
  ```json
  {
    "status": "confirmed"
  }
  ```

## Error Responses
Common error responses:

- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Example error response:
```json
{
  "error": "Error message"
}