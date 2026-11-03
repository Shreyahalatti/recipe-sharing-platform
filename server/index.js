const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data for now - later we will add MongoDB
let recipes = [];
let users = [];

app.get('/', (req, res) => {
  res.send('Recipe Sharing Platform API is Running');
});

// 1. Create Recipe
app.post('/api/recipes', (req, res) => {
  const recipe = { id: Date.now(), ...req.body };
  recipes.push(recipe);
  res.status(201).json(recipe);
});

// 2. Browse & Search with Filtering
app.get('/api/recipes', (req, res) => {
  let { ingredient, cuisine, maxCookTime, search } = req.query;
  let result = recipes;

  if (search) {
    result = result.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));
  }
  if (cuisine) {
    result = result.filter(r => r.cuisine === cuisine);
  }
  if (ingredient) {
    result = result.filter(r => r.ingredients && r.ingredients.includes(ingredient));
  }
  if (maxCookTime) {
    result = result.filter(r => r.cookTime <= parseInt(maxCookTime));
  }
  res.json(result);
});

// 3. Get one recipe
app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id == req.params.id);
  res.json(recipe);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));