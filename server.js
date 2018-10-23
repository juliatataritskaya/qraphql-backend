var express = require('express');
var app = express();
const graphql = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
var apiRoutes = express.Router();
app.use(cors());
app.use('/api', apiRoutes);

apiRoutes.use(
  '/graphql',
  graphql({
    schema: schema,
    graphiql: true
  })
);

apiRoutes.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// app.listen(3000, () => console.log('Example app listening on port 3000!'));
var createServer = function () {
  app.listen(3000, function () {
    console.log("The server is running on port 3000");
  });
};

createServer();
