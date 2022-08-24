const { dbConfig } = require('../../config');
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

router.post('/', async (req, res) => {
  let input = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        INSERT INTO books (img,title,author,year,description,price,email)
        VALUES ('${input.img}', '${input.title}', '${input.author}', '${input.year}','${input.description}' ,'${input.price}','${req.headers.email}')

        `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
