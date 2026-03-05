# TP2 API

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Route Testing

You can test the routes using tools like Postman or curl. Here are some example requests:
- **Get all users:**
  ```bash
  curl -X GET http://localhost:3001/api/users
  ```
- **Create a new user:**
  ```bash
  curl -X POST http://localhost:3001/api/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "role": "admin"}'
  ```
- **Get a user by ID:**
  ```bash
  curl -X GET http://localhost:3001/api /users/1
  ```
- **Update a user:**
  ```bash
  curl -X PUT http://localhost:3001/api/users/1 -H "Content-Type: application/json" -d '{"name": "John Doe Updated", "email": "john.updated@example.com", "role": "user"}'
  ```
- **Delete a user:**
  ```bash
  curl -X DELETE http://localhost:3001/api/users/1
    ```
