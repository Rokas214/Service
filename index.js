const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const { port } = require('./src/config');
const {
  auth,
  createProduct,
  deleteProduct,
  home,
  userProducts,
  viewSingleProduct,
  cart,
} = require('./src/routes/v1');

app.use('/postproduct', createProduct);
app.use('/auth', auth);
app.use('/login', auth);
app.use('/home', home);
app.use('/delete', deleteProduct);
app.use('/userproduct', userProducts);
app.use('/viewpost', viewSingleProduct);
app.use('/cart', cart);

app.listen(port, () => console.log("it's working"));
