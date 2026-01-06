import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [menu, setMenu] = useState([]);
  const [dishName, setDishName] = useState("");

  // 1. Fetch the menu when the app loads
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const response = await fetch('http://localhost:5000/menu');
    const data = await response.json();
    setMenu(data);
  };

  // 2. Submit a new dish to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dishName) return;

    await fetch('http://localhost:5000/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: dishName })
    });

    setDishName(""); // Clear input
    fetchMenu();     // Refresh the list
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Menu</h1>

        {/* The Input Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter dish name..."
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>
            Add Dish
          </button>
        </form>

        {/* The List */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menu.map((dish) => (
            <li key={dish.id} style={{ margin: '10px', fontSize: '1.5rem', background: '#282c34', padding: '10px', border: '1px solid white' }}>
              🍽️ {dish.name}
            </li>
          ))}
        </ul>

      </header>
    </div>
  );
}

export default App;