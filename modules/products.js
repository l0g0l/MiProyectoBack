const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    connectionLimit: 5,
    database: 'productos' // Ojo!! poner aqui la BBDD que se cree
});


exports.getLista = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection(); // Conexión a la base de datos
        let product = await conn.query("SELECT * from productos.articulos"); // query para pintar los productos que tenga en la BBDD
        console.log(product); // es un array
        return res.render('index', { Producto: product }); // index, es el pug que quiero pintar y el otro parámetro es la variable con todos los productos. En el pug indico de Producto, que quiero que se pinte, en este caso la descripción
       
    } catch (err) {
        return null;
    } finally { // Tanto si se ejecuta el try como el catch, se ejecuta el finally, siempre se ejecuta
        if (conn) conn.end();
    }
}


exports.createP = async (req, res) => {
    console.log(req.body);
    let producto = req.body.producto 
    let conn;
    try {
        conn = await pool.getConnection(); // Conexión a la base de datos
        let borrar = await conn.query('INSERT INTO articulos (descripcion, comprado)VALUES (?, FALSE)', [producto]); // producto sustituye a la interrogación
        res.status(200).redirect('/'); // lo redirecciono a la vista
        
    } catch (err) {
        console.log(err);
        
        return null;
    } finally { // Tanto si se ejecuta el try como el catch, se ejecuta el finally, siempre se ejecuta
        if (conn) conn.end();
    }
}


exports.updateP = async (req, res) => {
    console.log(req.params); // se utiliza cuando le pones un/:id en el endpoint
    // console.log(req.body);
    let id = req.params.id
    let comprado = req.body.comprado

    let conn;
    try {
        conn = await pool.getConnection(); // Conexión a la base de datos
        let borrar = await conn.query('UPDATE articulos SET comprado = ? WHERE ID = ?', [comprado, id]);
        res.status(200).redirect('/'); // lo redirecciono a la vista
        

    } catch (err) {
        console.log(err);
        
        res.status(200).redirect('/'); 
    } finally { // Tanto si se ejecuta el try como el catch, se ejecuta el finally, siempre se ejecuta
        if (conn) conn.end();
    }

}

exports.removeP = async (req, res) => {
    console.log(req.params); // cuando le pones un id, tienes que utilizar estos parámetros para mostrar la info del id
    let id = req.params.id
    console.log(id);

    let conn;
    try {
        conn = await pool.getConnection(); // Conexión a la base de datos
        let borrar = await conn.query('DELETE FROM articulos WHERE ID = ?', [id]);// borra producto BBDD, la interrogación sustituye a cualquier id, como segundo parámetro le paso la variable id en formato array
        res.status(200).redirect('/'); // lo redirecciono a la vista
        

    } catch (err) {
        console.log(err);
        
        return null;
    } finally { // Tanto si se ejecuta el try como el catch, se ejecuta el finally, siempre se ejecuta
        if (conn) conn.end();
    }
}
