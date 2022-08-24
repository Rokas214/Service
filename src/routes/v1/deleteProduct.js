const { dbConfig } = require('../../config');
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        DELETE FROM books
        WHERE id = ('${req.body.id}')
        `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ msg: 'Something went wrong' });
  }
});

module.exports = router;
