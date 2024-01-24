const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password: conf.password,
  database: conf.database
});

app.get('/api/users', (req, res) => {
  pool.query("SELECT * FROM posts", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get('/api/users/:num', (req, res) => {
  const num = req.params.num;
  const query = 'SELECT * FROM posts WHERE num = ?';
  pool.query(query, [num], (error, results) => {
    if (error) {
      console.error('Error during database query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: 'Not Found' });
      }
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));