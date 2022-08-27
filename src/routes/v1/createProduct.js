const { dbConfig } = require('../../config');
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const Joi = require('joi');

const userSchema = Joi.object({
  img: Joi.string().min(6).max(255).required(),
  title: Joi.string().min(6).max(255).required(),
  author: Joi.string().min(6).max(255).required(),
  year: Joi.number().integer().max(2022),
  description: Joi.string().min(6).max(149).required(),
  price: Joi.number().integer().min(0).max(2022),
});

router.post('/', async (req, res) => {
  let input = req.body;

  try {
    input = await userSchema.validateAsync(input);
  } catch (err) {
    return res.send({
      err: 'Something went wrong, make sure you fill all blanks correctly',
    });
  }

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
