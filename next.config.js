// next.config.js
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

module.exports = {
  env,
  output: 'export',
};