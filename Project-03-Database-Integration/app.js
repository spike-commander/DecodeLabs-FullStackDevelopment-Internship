require('dotenv').config();
const express = require('express');
const { query } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running', endpoints: ['GET /api/items', 'GET /api/items/:id', 'POST /api/items', 'PUT /api/items/:id', 'DELETE /api/items/:id'] });
});

app.post('/api/items', async (req, res, next) => {
  try {
    const { user_id, title, description } = req.body;

    if (!user_id || !title) {
      return res.status(400).json({ error: 'user_id and title are required' });
    }

    const result = await query(
      'INSERT INTO items (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [user_id, title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.get('/api/items', async (req, res, next) => {
  try {
    const result = await query(
      'SELECT items.*, users.username FROM items JOIN users ON items.user_id = users.id'
    );

    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/items/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT items.*, users.username FROM items JOIN users ON items.user_id = users.id WHERE items.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.put('/api/items/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'title is required' });
    }

    const result = await query(
      'UPDATE items SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/items/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM items WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === '23505') {
    return res.status(400).json({ error: 'Unique constraint violation', detail: err.detail });
  }

  if (err.code === '23514') {
    return res.status(400).json({ error: 'Check constraint violation', detail: err.detail });
  }

  if (err.code === '23503') {
    return res.status(400).json({ error: 'Foreign key constraint violation', detail: err.detail });
  }

  console.error('Unhandled error:', err.message, err.stack);
  res.status(500).json({ error: 'Internal server error', detail: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
