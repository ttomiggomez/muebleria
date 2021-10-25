const express = require('express');
const { renderProductI } = require('./database');
var router = express.Router();
var database = require('./database')

// define the home page route
router.get('/', function(req , res) {

    database.renderProduct()
        .then(productos => {
            res.json(productos)
        })
        .catch(err => {
            console.log(err)
            res.json({error: "Hubo un error al consultar la D B."});
        })
})
// define the product route
router.get('/:id', function(req, res){
    let id = req.params.id
    res.send(database.renderProductI(id))
});
router.post('/agregar', function(req,res){
    let nombre = req.body.nombre
    let id = req.body.id
    let stock = req.body.stock
    res.send(database.addP(id,nombre,stock))
})
router.delete('/borrar/:id', function(req,res){
    var idProdElim = req.params.id
    res.send(database.eliminateP(idProdElim))
})
router.put('/modificar/:id', function(req, res){
    var idProdMod = req.params.id
    var modi = req.body
    res.send(database.modifyP(idProdMod, modi))
})



module.exports = {
    router:router,
}
