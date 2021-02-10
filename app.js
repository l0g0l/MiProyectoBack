const express = require('express');
const products = require('./modules/products')
const app = express();
const port = 3000;
let methodOverride = require("method-override");
app.use(methodOverride("_method")); // para poder hacer un DELETE en un fomrulario POST



app.use(express.static('public')); // Hacemos public que se pueda ver
app.set('view engine', 'pug'); // Para poder usar pug
app.set('views', './views_pug'); // Para poder usar pug

let bodyParser = require('body-parser'); // Para poder acceder a lo de .body
let urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(express.urlencoded({ extended: true }))

app.get('/', urlencodedParser, products.getLista);// visualizar el pug
app.post('/createproduct',  products.createP);
app.post('/actualizar/:id', urlencodedParser, products.updateP);
app.delete('/removeproduct/:id', urlencodedParser, products.removeP);


// // errores
app.use(function (req, res, next) {
  return res.status(404).send({

    message: 'Route' + req.url + ' Not found.'
  });
});
app.use(function (err, req, res, next) {
  return res.status(500).send({ error: err });
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
