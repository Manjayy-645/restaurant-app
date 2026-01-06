const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import the Postgres library

const app = express();

app.use(cors());
app.use(express.json()); // Allow the server to read JSON data

// 1. Set up the connection to the Database
const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});

// 2. Create the "menu" table automatically when the server starts
pool.query(`
  CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
`)
.then(() => console.log('✅ Table "menu" created (or already exists)'))
.catch(err => console.error('❌ Error creating table:', err));

// 3. GET Route: Fetch all dishes
app.get('/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 4. POST Route: Add a new dish
app.post('/menu', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO menu (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 5. DELETE Route: Remove a dish by ID
app.delete('/menu/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the ID number from the URL
    await pool.query('DELETE FROM menu WHERE id = $1', [id]);
    res.json({ message: "Dish deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('The Kitchen is open on port 5000');
});