const { dbConfig } = require('../../config');
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

router.get('/', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        SELECT * from books
        WHERE email=('${req.headers.email}')
        `);
    await con.end();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
