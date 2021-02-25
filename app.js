const protect = require('static-auth');
const safeCompare = require('safe-compare');

const app = protect(
  '/',
  (password) =>
    safeCompare(password, process.env.PASSWORD || 'secret'),
  {
    directory: `${__dirname}/public`,
    onAuthFailed: (res) => {
      res.end('Authentication failed');
    },
  }
);

module.exports = app;