import { useState, useEffect } from 'react'

function App() {
  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState({ title: '', description: '', ingredients: '', cuisine: '', cookTime: '', photo: '' })
  const [search, setSearch] = useState('')

  const API = 'http://localhost:5000/api/recipes'

  const fetchRecipes = async () => {
    const res = await fetch(`${API}?search=${search}`)
    const data = await res.json()
    setRecipes(data)
  }

  useEffect(() => { fetchRecipes() }, [search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        ingredients: form.ingredients.split(','),
        cookTime: parseInt(form.cookTime)
      })
    })
    setForm({ title: '', description: '', ingredients: '', cuisine: '', cookTime: '', photo: '' })
    fetchRecipes()
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h1>🍲 Recipe Sharing Platform</h1>

      <input placeholder="Search recipes..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px' }} />

      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>Post New Recipe</h3>
        <input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
        <input required placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
        <input required placeholder="Ingredients comma separated (tomato,cheese)" value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
        <input placeholder="Cuisine (Italian, Indian)" value={form.cuisine} onChange={e => setForm({ ...form, cuisine: e.target.value })} style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
        <input placeholder="Cook Time (mins)" type="number" value={form.cookTime} onChange={e => setForm({ ...form, cookTime: e.target.value })} style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
        <input placeholder="Photo URL" value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} style={{ width: '100%', margin: '5px 0', padding: '8px' }} />
        <button type="submit" style={{ padding: '10px 20px', background: 'orange', color: 'white', border: 'none', borderRadius: '5px' }}>Post Recipe</button>
      </form>

      <h2>All Recipes ({recipes.length})</h2>
      {recipes.map(r => (
        <div key={r.id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0', borderRadius: '8px' }}>
          <h3>{r.title} - {r.cuisine} ({r.cookTime} min)</h3>
          <p>{r.description}</p>
          <p><b>Ingredients:</b> {r.ingredients?.join(', ')}</p>
          {r.photo && <img src={r.photo} alt="" style={{ width: '200px' }} />}
        </div>
      ))}
    </div>
  )
}
export default App