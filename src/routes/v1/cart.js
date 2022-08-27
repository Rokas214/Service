const { dbConfig } = require('../../config');
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

router.post('/cart', async (req, res) => {
  let input = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
          INSERT INTO cart (img,title,author,year,description,price,email)
          VALUES ('${input.img}', '${input.title}', '${input.author}', '${input.year}','${input.description}' ,'${input.price}','${input.email}')
  
          `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/delcart', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
          DELETE FROM cart
          WHERE id = ('${req.body.id}')
          `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: err });
  }
});

router.post('/getcart', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`SELECT * FROM cart
    WHERE email = ('${req.headers.email}')`);
    await con.end();
    return res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
