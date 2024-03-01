const accountRouter = require('./account.router');
const shoeRouter = require('./shoe.router');
const cartRouter = require('./cart.router');
const orderRouter = require('./order.router');

module.exports = (app) => {
  app.use('/api/accounts', accountRouter);
  app.use('/api/shoes', shoeRouter);
  app.use('/api/carts', cartRouter);
  app.use('/api/orders', orderRouter);
  
  app.use('/*', (req, res) => {
    res.json({
      statusCode: 404,
      message: 'page not found',
    });
  });
};
