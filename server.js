const express = require('express')

//funcion para hacer grupos-prefix
express.application.prefix = express.Router.prefix = function (path, configure) {
  var router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
  }; 
//fin de funcion
const app = express()
const port = process.env.PORT || 3001;
const mongoose = require('mongoose')
const Store = require('./api/models/storeModel');
const Variant = require('./api/models/variantModel');
const bodyParser = require('body-parser')
const cors = require('cors')

const storeRoutes = require('./api/routes/storeRoutes')
const variantRoutes = require('./api/routes/variantRoutes')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/Shopify')

app.use(cors())
app.use(bodyParser.urlencoded({  extended: true}))
app.use(bodyParser.json())


//routes(app)
app.prefix('/api/v1/', function(home){
  storeRoutes(home)
  variantRoutes(home)
})

app.listen(port);

console.log(`API de prueba escuchando en ${port}`)