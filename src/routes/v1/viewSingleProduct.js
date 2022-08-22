const { dbConfig } = require('../../config');
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const cors = require('cors');

router.post('/', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        SELECT * FROM books
        WHERE id=('${req.headers.id}')
        `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
