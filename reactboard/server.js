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
  pool.query(query, [num], (err, results) => {
    if (results && results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ err: 'Not Found' });
    }
  });
});

app.post('/api/users', (req, res) => {
  let sql = 'INSERT INTO posts (title, author, content, w_time) VALUES (?, ?, ?, NOW())';
  let title = req.body.title;
  let author = req.body.author;
  let content = req.body.content;
  let params = [title, author, content];
  pool.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// // pool 대신 connection을 사용했을 경우
// const connection = mysql.createConnection({
//   host: conf.host,
//   port: conf.port,
//   user: conf.user,
//   password: conf.password,
//   database: conf.database
// });
// app.get('/api/users',(req, res) => {
//   connection.query(
//     "SELECT * FROM posts",
//     (err, rows, fields) => {
//       res.send(rows);
//     }
//   );
// });

// // Write.js에서 Content-Type으로 multipart/form-data 사용했을 경우
// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// app.post('/api/users', upload.none(), (req, res) => {
//   let sql = 'INSERT INTO posts (title, author, content, w_time) VALUES (?, ?, ?, NOW())';
//   let title = req.body.title;
//   let author = req.body.author;
//   let content = req.body.content;
//   // console.log(title);
//   // console.log(content);
//   // console.log(author);
//   let params = [title, author, content];
//   connection.query(sql, params,
//     (err, rows, fields) => {
//       res.send(rows);
//     }
//   );
// });