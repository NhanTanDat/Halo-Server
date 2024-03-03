const accountRouter = require('./account.router');


module.exports = (app) => {

  app.use('/api/accounts', accountRouter);
 
  
  app.use('/*', (req, res) => {
    res.json({
      statusCode: 404,
      message: 'page not found',
    });
  });
};
