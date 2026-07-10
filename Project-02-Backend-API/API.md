# Backend API Documentation

## Overview
This is a RESTful Backend API for managing items. It follows stateless principles with JSON data exchange.

## Base URL
```
http://localhost:3000
```

## Endpoints

### GET /items
**Purpose:** Retrieve all items in the collection.

**Request:**
```http
GET /items HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Laptop",
    "price": 999.99,
    "category": "Electronics",
    "inStock": true
  }
]
```

---

### POST /items
**Purpose:** Create a new item.

**Request:**
```http
POST /items HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "Keyboard",
  "price": 79.99,
  "category": "Electronics",
  "inStock": true
}
```

**Request Body Schema:**
| Field      | Type    | Required | Description                    |
|------------|---------|----------|--------------------------------|
| name       | string  | Yes      | Item name (1-100 characters)   |
| price      | number  | Yes      | Price (0 - 1,000,000)          |
| category   | string  | Yes      | Item category                  |
| inStock    | boolean | No       | Stock status (default: true)   |

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Keyboard",
  "price": 79.99,
  "category": "Electronics",
  "inStock": true
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Validation failed: \"name\" is required and must be a string"
}
```

---

### PUT /items/{id}
**Purpose:** Update an existing item by ID.

**Request:**
```http
PUT /items/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "Laptop Pro",
  "price": 1299.99,
  "category": "Electronics",
  "inStock": false
}
```

**Path Parameters:**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| id        | string | Item UUID   |

**Response (204 No Content):**
No body returned on success.

**Error Response (404 Not Found):**
```json
{
  "error": "Item with id \"invalid-id\" not found"
}
```

---

### DELETE /items/{id}
**Purpose:** Remove an item by ID.

**Request:**
```http
DELETE /items/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:3000
```

**Path Parameters:**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| id        | string | Item UUID   |

**Response (204 No Content):**
No body returned on success.

**Error Response (404 Not Found):**
```json
{
  "error": "Item with id \"invalid-id\" not found"
}
```

---

## HTTP Status Codes

| Code | Meaning              | When Used                                    |
|------|----------------------|----------------------------------------------|
| 200  | OK                   | Successful GET request                       |
| 201  | Created              | Successful POST creation                     |
| 204  | No Content           | Successful PUT or DELETE (no body returned)   |
| 400  | Bad Request          | Validation or syntax error                   |
| 404  | Not Found            | Resource does not exist                      |
| 500  | Internal Server Error| Unexpected server failure                    |

## Validation Layers

### Syntactic Validation
Verifies the incoming schema/format matches the expected template:
- Body must be a JSON object
- `name` must be a string
- `price` must be a non-negative number
- `category` must be a string

### Semantic Validation
Verifies the structural logic makes operational sense:
- `name` cannot be empty or whitespace-only
- `name` cannot exceed 100 characters
- `price` cannot exceed 1,000,000
- `inStock` must be boolean if provided

## Running the Server
```bash
npm install
node server.js
```

## Testing with cURL

**Get all items:**
```bash
curl http://localhost:3000/items
```

**Create an item:**
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse","price":29.99,"category":"Electronics"}'
```

**Update an item:**
```bash
curl -X PUT http://localhost:3000/items/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse Pro","price":49.99,"category":"Electronics"}'
```

**Delete an item:**
```bash
curl -X DELETE http://localhost:3000/items/{id}
```
