const auth = require('./auth');
const createProduct = require('./createProduct');
const deleteProduct = require('./deleteProduct');
const home = require('./home');
const loginUser = require('./auth');
const userProducts = require('./userProducts');
const viewSingleProduct = require('./viewSingleProduct');
const cart = require('./cart');

module.exports = {
  auth,
  createProduct,
  deleteProduct,
  home,
  loginUser,
  userProducts,
  viewSingleProduct,
  cart,
};
