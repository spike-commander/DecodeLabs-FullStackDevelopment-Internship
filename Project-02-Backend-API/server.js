const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const items = [
  { id: uuidv4(), name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true },
  { id: uuidv4(), name: 'Headphones', price: 149.50, category: 'Electronics', inStock: true },
  { id: uuidv4(), name: 'Coffee Mug', price: 12.99, category: 'Kitchen', inStock: false },
];

function syntacticValidation(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { body } = req;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Invalid request body: must be a JSON object' });
    }
    if (!body.name || typeof body.name !== 'string') {
      return res.status(400).json({ error: 'Validation failed: "name" is required and must be a string' });
    }
    if (body.price === undefined || typeof body.price !== 'number' || body.price < 0) {
      return res.status(400).json({ error: 'Validation failed: "price" is required and must be a non-negative number' });
    }
    if (!body.category || typeof body.category !== 'string') {
      return res.status(400).json({ error: 'Validation failed: "category" is required and must be a string' });
    }
  }
  next();
}

function semanticValidation(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { body } = req;
    if (body.name.trim().length === 0) {
      return res.status(400).json({ error: 'Semantic error: "name" cannot be empty or whitespace' });
    }
    if (body.name.length > 100) {
      return res.status(400).json({ error: 'Semantic error: "name" exceeds maximum length of 100 characters' });
    }
    if (body.price > 1000000) {
      return res.status(400).json({ error: 'Semantic error: "price" exceeds reasonable limit of 1,000,000' });
    }
    if (req.method === 'POST' && body.inStock !== undefined && typeof body.inStock !== 'boolean') {
      return res.status(400).json({ error: 'Semantic error: "inStock" must be a boolean if provided' });
    }
  }
  next();
}

app.get('/items', (req, res) => {
  res.status(200).json(items);
});

app.post('/items', syntacticValidation, semanticValidation, (req, res) => {
  const newItem = {
    id: uuidv4(),
    name: req.body.name.trim(),
    price: req.body.price,
    category: req.body.category.trim(),
    inStock: req.body.inStock !== undefined ? req.body.inStock : true,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', syntacticValidation, semanticValidation, (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item with id "${id}" not found` });
  }
  items[index] = {
    id,
    name: req.body.name.trim(),
    price: req.body.price,
    category: req.body.category.trim(),
    inStock: req.body.inStock !== undefined ? req.body.inStock : items[index].inStock,
  };
  res.status(204).send();
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item with id "${id}" not found` });
  }
  items.splice(index, 1);
  res.status(204).send();
});

app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal server error: an unexpected failure occurred' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
