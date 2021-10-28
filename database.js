let mysql = require("mysql");

let conn = mysql.createConnection({
    host:"mysql",
    user: "root",
    password: "root",
    database: "Muebleria"
})

conn.connect();


var usuariosH = 
[{
    "id" : "123",
    "nombre" : "Marge",
    "pass" : "UADE",
},{
    "id" : "456",
    "nombre" : "Bart",
    "pass" : "UADE1",
},{
    "id" : "324",
    "nombre" : "Lisa",
    "pass" : "UADE2",
},{
    "id" : "141",
    "nombre" : "Homero",
    "pass" : "UADE3",
},{
    "id" : "007",
    "nombre" : "Maggie",
    "pass" : "UADE4",
}]

var productosH = 
[{
    "id" : "1",
    "nombre" : "Mesa de comedor TEA",
    "stock" : true,
    "precio" : "120000",
    "imagenes": [
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/mesa-pinotea-rustica-pata-hierro-31-1d29c3eb8f9fc2290c15964162976558-480-0.jpg",
],
    "rating": 2,

    
},{
    "id" : "2",
    "nombre" : "Mesa de comedor COPA",
    "stock" : false,
    "precio" : "90000",
    "imagenes": "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/arreglada1-ed7974c9bba733cfa815946818924356-480-0.jpg",
    "rating": 3,

},{
    "id" : "3",
    "nombre" : "Mesa de Comedor Escandinavia",
    "stock" : true,
    "precio" : "99000",
    "imagenes": [
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/51-a730b8bf8858370ecd15918247964397-480-0.jpg",
],
    "rating":5,

},{
    "id" : "4",
    "nombre" : "Sillon Sala",
    "stock" : true,
    "precio" : "45000",
    "imagenes": [
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/tupi-16071-dd68172a0266fe2b1715922608346611-480-0.jpg",
],
    "rating": 4,
},{
    "id" : "5",
    "nombre" : "Sillon BKF",
    "stock" : true,
    "precio" : "30000",
    "imagenes": [
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/2251-ce7095138babbabcb315916459350558-480-0.jpg",
    ],
    "rating": 3,
},{
    "id" : "6",
    "nombre" : "Honguito Uruguayo",
    "stock" : false,
    "precio" : "22500",
    "imagenes": [
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/tupi-abr3w-10051-0f2881648c2cb4a38c15908697873532-480-0.jpg",
    ],
    "rating": 2,
},{
    "id" : "7",
    "nombre" : "Biblioteca Cajones",
    "stock" : true,
    "precio" : "70000",
    "imagenes": [
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/1101-2333018784da678db415914807164845-480-0.jpg",
    ],
    "rating": 1,
},{
    "id" : "8",
    "nombre" : "Biblioteca Rustica",
    "stock" : true,
    "precio" : "105000",
    "imagenes": [
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/dbfbsbfgmmm3-871c7189d88c21acfb15969182621130-480-0.jpg",
    ],
    "rating": 1,
},{
    "id" : "9",
    "nombre" : "Biblioteca de colgar",
    "stock" : true,
    "precio" : "55000",
    "imagenes": [
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/206/598/products/1221-6dfecc21571b78982415914907488887-480-0.jpg",
    ],
    "rating": 1,
},]

function renderUser(){
 return(usuariosH)
}
function renderProduct(){
    return new Promise(function(resolve, reject){
        
        conn.query("SELECT * FROM productos JOIN precios ON id = precios.id_precio JOIN stock on id = stock.stock_id;", (err, rows) => {
            if(err){
                    reject(err);
            } else {
                    
                    resolve(rows);
            }
        });
    })
}
function renderProductI(id){
    let producto = productosH.find(producto => producto.id === id);
    return(producto)
}
function renderUserI(id){
    var usuario = usuariosH.find(usuario => usuario.id === id)
    return(usuario)
}
function addP(id,nombre,stock){
    product = {
        "id" : id,
        "nombre" : nombre, 
        "stock" : stock
    }   
    productosH.push(product)
    return(productosH);
}
function addU(id,nombre,pass){
    user = {
        "id" : id,
        "nombre" : nombre, 
        "pass" : pass
    }   
    usuariosH.push(user)
    return(usuariosH);
}

function eliminateP (id) {
    let indexProdElim = productosH.findIndex(producto => producto.id === id);
    productosH.splice(indexProdElim,1)
    return(productosH)
}
function eliminateU (id) {
    let indexUserElim = usuariosH.findIndex(user => user.id === id);
    usuariosH.splice(indexUserElim,1)
    return(usuariosH)
}
function modifyP(id, mod){  
    let indexProdMod = productosH.findIndex(producto => producto.id === id)
    productosH.splice(indexProdMod,1,mod)
    return(productosH)
}
function modifyU (id, mod) {
    let indexUserMod = usuariosH.findIndex(user => user.id === id)
    usuariosH.splice(indexUserMod,1,mod)
    return(usuariosH)
}
module.exports = {
    renderProduct : renderProduct,
    renderUser : renderUser,
    renderProductI : renderProductI,
    renderUserI : renderUserI,
    addP : addP,
    addU : addU,
    eliminateP : eliminateP,
    eliminateU : eliminateU,
    modifyP : modifyP,
    modifyU : modifyU,
    productosH : productosH,
    usuariosH : usuariosH,
 

}