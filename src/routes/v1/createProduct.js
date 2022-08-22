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
        VALUES ('${input.img}', '${input.title}', '${input.author}', '${input.year}','${input.description}' ,'${input.price}','${input.email}')

        `);
    await con.end();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post('/cart', async (req, res) => {
  let input = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        INSERT INTO cart (img,title,author,year,description,price,email)
        VALUES ('${input.img}', '${input.title}', '${input.author}', '${input.year}','${input.description}' ,'${input.price}','${input.email}')

        `);
    await con.end();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/getcart', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`SELECT * FROM cart`);
    await con.end();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
