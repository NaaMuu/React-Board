const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password: conf.password,
  database: conf.database
});

app.get('/api/users',(req, res) => {
  connection.query(
    "SELECT * FROM posts",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
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


const multer = require('multer');
const storage = multer.memoryStorage();
const upload =  multer({ storage: storage });
// Write.js에서 Content-Type으로 application/json을 사용할 때,
// 위 3줄을 지우고 app.post('/api/users', (req, res) => { 로 변경
app.post('/api/users', upload.none(), (req, res) => {
  let sql = 'INSERT INTO posts (title, author, content, w_time) VALUES (?, ?, ?, NOW())';
  let title = req.body.title;
  let author = req.body.author;
  let content = req.body.content;
  // console.log(title);
  // console.log(content);
  // console.log(author);
  let params = [title, author, content];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
    )
})

app.listen(port, () => console.log(`Listening on port ${port}`));

// app.get(`/api/users/${num}`,(req, res) => {
//   connection.query(
//     "SELECT * FROM posts WHERE num = ?", [num],
//     (err, rows, fields) => {
//       res.send(rows);
//     }
//   );
// });