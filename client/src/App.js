import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [menu, setMenu] = useState([]);
  const [dishName, setDishName] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const response = await fetch('http://localhost:5000/menu');
    const data = await response.json();
    setMenu(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dishName) return;

    await fetch('http://localhost:5000/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: dishName })
    });

    setDishName("");
    fetchMenu();
  };

  // NEW: Function to delete a dish
  const deleteDish = async (id) => {
    await fetch(`http://localhost:5000/menu/${id}`, {
      method: 'DELETE',
    });
    fetchMenu(); // Refresh the list immediately
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Menu</h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter dish name..."
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px', fontSize: '16px', marginLeft: '5px' }}>
            Add Dish
          </button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0, width: '300px' }}>
          {menu.map((dish) => (
            <li key={dish.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '10px 0',
              fontSize: '1.2rem',
              background: '#282c34',
              padding: '10px',
              border: '1px solid white',
              borderRadius: '5px'
            }}>
              <span>🍽️ {dish.name}</span>
              
              {/* The Delete Button */}
              <button 
                onClick={() => deleteDish(dish.id)}
                style={{ 
                  background: 'red', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  cursor: 'pointer',
                  borderRadius: '3px'
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>

      </header>
    </div>
  );
}

export default App;