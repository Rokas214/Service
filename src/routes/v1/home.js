const express = require('express');
const { dbConfig } = require('../../config');
const mysql = require('mysql2/promise');
const { isLoggedIn } = require('../../midleware');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
		SELECT * FROM books
		`);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
