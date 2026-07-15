# Project 3: Database Integration

Production-ready stateless RESTful API for item management with PostgreSQL and raw SQL.

## Tech Stack

- **Runtime:** Node.js with Express.js
- **Database:** PostgreSQL
- **Interface:** Native `pg` driver — no ORM
- **Architecture:** Stateless RESTful HTTP endpoints mapping to raw SQL CRUD operations

## Environment Setup (.env)

Create a `.env` file in the project root with the following variables:

```
PGUSER=your_db_user
PGHOST=localhost
PGDATABASE=your_db_name
PGPASSWORD=your_db_password
PGPORT=5432
PORT=3000
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create the Database

```bash
psql -U your_db_user -d postgres -c "CREATE DATABASE your_db_name;"
```

### 3. Run Migrations

```bash
psql -U your_db_user -d your_db_name -f schema.sql
```

### 4. Start the Server

**Production:**
```bash
npm start
```

**Development (with auto-reload):**
```bash
npm run dev
```

## API Endpoint Contract

### POST `/api/items`
Create a new item.

**Example:**
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

**Request Body:**
```json
{
  "user_id": 1,
  "title": "Item Title",
  "description": "Optional description"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "created_at": "2026-01-01T00:00:00.000Z"
}
```

---

### GET `/api/items`
Retrieve all items with the associated username.

**Example:**
```bash
curl http://localhost:3000/api/items
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "created_at": "2026-01-01T00:00:00.000Z",
    "username": "johndoe"
  }
]
```

---

### GET `/api/items/:id`
Retrieve a single item by ID.

**Example:**
```bash
curl http://localhost:3000/api/items/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "created_at": "2026-01-01T00:00:00.000Z",
  "username": "johndoe"
}
```

**Error:** `404 Not Found`
```json
{
  "error": "Item not found"
}
```

---

### PUT `/api/items/:id`
Update an existing item.

**Example:**
```bash
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries and snacks", "description": "Milk, eggs, bread, chips"}'
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries and snacks",
  "description": "Milk, eggs, bread, chips",
  "created_at": "2026-01-01T00:00:00.000Z"
}
```

**Error:** `404 Not Found`
```json
{
  "error": "Item not found"
}
```

---

### DELETE `/api/items/:id`
Delete an item by ID.

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/items/1
```

**Response:** `204 No Content` | `404 Not Found`
```json
{
  "error": "Item not found"
}
```

## Database Schema

### `users`
| Column   | Type                    | Constraints              |
|----------|-------------------------|--------------------------|
| id       | SERIAL                  | PRIMARY KEY              |
| username | VARCHAR(255)            | UNIQUE, NOT NULL         |
| email    | VARCHAR(255)            | UNIQUE, NOT NULL         |
| age      | INTEGER                 | NOT NULL, CHECK (age>=18)|

### `items`
| Column      | Type                    | Constraints                           |
|-------------|-------------------------|---------------------------------------|
| id          | SERIAL                  | PRIMARY KEY                           |
| user_id     | INTEGER                 | NOT NULL, FK → users(id) ON DELETE CASCADE |
| title       | VARCHAR(255)            | NOT NULL                              |
| description | TEXT                    |                                       |
| created_at  | TIMESTAMP               | DEFAULT CURRENT_TIMESTAMP             |
