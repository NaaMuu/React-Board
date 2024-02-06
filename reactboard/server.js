const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');
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

app.get('/api/posts', (req, res) => {
  const query = "SELECT * FROM posts";
  pool.query(query, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get('/api/posts/:num', (req, res) => {
  const num = req.params.num;
  const query = 'SELECT * FROM posts WHERE num = ?';
  pool.query(query, [num], (err, rows, fields) => {
      res.json(rows[0]);
  });
});

app.post('/api/posts', (req, res) => {
  const { title, author, content, pw } = req.body;
  const writeData = [title, author, content, pw];
  const query = "INSERT INTO posts (title, author, content, w_time, pw) VALUES (?, ?, ?, NOW(), ?)";
  pool.query(query, writeData, (err, rows, fields) => {
    res.send(rows);
  });
});

app.patch('/api/posts/:num', (req, res) => {
  const num = req.params.num;
  const updateData = req.body;
  const query = "UPDATE posts SET title=?, content=?, w_time=NOW() WHERE num=?";
  pool.query(query, [updateData.title, updateData.content, num], (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete('/api/posts/:num', (req, res) => {
  const num = req.params.num;
  const query = "DELETE FROM posts WHERE num = ?";
  pool.query(query, [num], (err, rows, fields) => {
    res.send(rows);
  });
});

app.get('/api/delete', (req, res) => {
  const query = "SELECT * FROM d_posts";
  pool.query(query, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get('/api/delete/:num', (req, res) => {
  const num = req.params.num;
  const query = 'SELECT * FROM d_posts WHERE num = ?';
  pool.query(query, [num], (err, rows, fields) => {
      res.json(rows[0]);
  });
});

app.delete('/api/delete/:num', (req, res) => {
  const num = req.params.num;
  const query = "DELETE FROM d_posts WHERE num = ?";
  pool.query(query, [num], (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));