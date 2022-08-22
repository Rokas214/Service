const express = require('express');
const { dbConfig } = require('../../config');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  passwordOne: Joi.string().min(6).max(255).required(),
  passwordTwo: Joi.string().min(6).max(255).required(),
});

router.get('/', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        SELECT * FROM users
        `);
    await con.end();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/register', async (req, res) => {
  let userInputs = req.body;

  if (userInputs.passwordOne !== userInputs.passwordTwo) {
    return res.send('Passwords must match!');
  }

  try {
    userInputs = await userSchema.validateAsync(userInputs);
  } catch (err) {
    return res
      .status(400)
      .send({ err: 'Something went wrong, make sure you enter valid email.' });
  }

  const cryptedPassword = bcrypt.hashSync(userInputs.passwordOne);

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        SELECT * FROM users WHERE email = ${mysql.escape(req.body.email)} 
        `);

    await con.end();
    if (data.length > 0) {
      return res.send({ err: 'Email is already taken' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
		insert into users (email,password)
		values (${mysql.escape(userInputs.email)},'${cryptedPassword}')
		`);

    await con.end();
    res.send(data);
    return data;
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  let userInputs = req.body;

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
        SELECT * FROM users WHERE email = ${mysql.escape(req.body.email)} 
        `);
    await con.end();
    if (data.length < 1) {
      return res.send({ err: 'Incorrect Email' });
    }

    const validatePassword = bcrypt.compareSync(
      userInputs.password,
      data[0].password,
    );

    const token = jwt.sign(
      {
        email: userInputs.email,
      },
      'rokas123',
    );

    return validatePassword
      ? res.send({ msg: 'Success', token })
      : res.status(400).send({ err: 'Incorrect Password' });
  } catch (err) {
    return res.status(500).send({ err: 'Something went wrong' });
  }
});

module.exports = router;
