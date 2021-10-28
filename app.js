const express = require ("express");
const app = express();
const cors = require("cors");

app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.json())

var products = require('./productos');
var users = require('./usuarios');


app.use('/productos', products.router);
app.use('/usuarios', users.router);





app.listen(8080, function() {
    console.log("Server funciona en port 8080. :)");
})
