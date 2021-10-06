const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
const { obtenerProductos, agregarProducto } = require('../models/producto.model');
//const { obtenerUsuarios } = require('../models/usuario.model')
const { adminpermisos } = require('../middlewares/Administrador.middleware')


/**
 * @swagger
 * /productos:
 *  get:
 *           
 *      summary: Obtener los productos por parte del administrador
 *      tags: [Productos]
 *      
 *      responses:
 *          200:
 *              description: Estos son los productos
 *                 
 *             
 */
// Obtener productos
router.get('/', adminpermisos, (req, res) => {
    res.json(obtenerProductos())
    // res.status(200).send()
})

/**
 * @swagger
 * /productos:
 *  post:
 *           
 *      summary: Agregar un producto por parte del administrador
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:   
 *                  
 *                          $ref: '#/components/schemas/producto' 
 * 
 *      responses:
 *          200:
 *              description: El producto se ha agregado correctamente
 *                 
 *             
 */
//Dar de alta nuevo producto por parte del administrador
router.post('/', adminpermisos, (req, res) => {
    agregarProducto(req.body)
    res.send("Agregado correctamente")
    // res.status(200).send()
})

/**
 * @swagger
 * /productos/{idProducto}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idProducto
 *        description: Identificador del producto
 *        required: true
 *        type: integer
 *      
 *      summary: Editar un producto por parte del administrador
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/productoeditado' 
 *      responses:
 *          200:
 *              description: Producto actualizado correctamente
 *         
 *                  
 *             
 */

//Editar  producto
router.put('/:idProducto', adminpermisos, (req, res) => {
    const productoId = req.params.idProducto;
    let { nombre } = req.body
    let { precio } = req.body
    let producto = obtenerProductos().find((dato) =>
        dato.id == productoId)
    producto.nombre = nombre
    producto.precio = precio
    res.status(200).send()
    res.send("Se ha actualizado el producto")

})

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: Identificador del producto
 *        required: true
 *        type: integer
 *      summary: Eliminar un producto por parte del administrador
 *      tags: [Productos]
 *      responses:
 *          200:
 *              description: El producto se ha eliminado correctamente
 * 
 */

//Borrar nuevo producto
router.delete('/:id', adminpermisos, (req, res) => {
    const productoId = req.params.id;
    let producto = obtenerProductos().find((dato) =>
        dato.id == productoId)
    let posicionObjeto = obtenerProductos().indexOf(producto)
    console.log(posicionObjeto)
    obtenerProductos().splice(posicionObjeto, 1)
    res.status(200).send()
    res.send("Objeto eliminado correctamente")
})

/**
 * @swagger
 * tags:
 *  name: Producto
 *  description: Agregar producto
 * 
 * components: 
 *  schemas:
 *      producto:
 *          type: object
 *          required:       
 *              -nombre
 *              -precio
 *              -des
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Describa el producto
 *              precio:              
 *                  type: integer
 *                  description: Precio del producto
 *              des:
 *                  type: string
 *                  description: Breve descripcion del producto
 *          example:
 *              nombre: jabon
 *              precio: 2500
 *              des: Jabonsuave
 *              
 *           
 *             
 */



/**
 * @swagger
 * tags:
 *  name: Producto
 *  description: Editar producto
 * 
 * components: 
 *  schemas:
 *      productoeditado:
 *          type: object
 *          required:       
 *              -nombre
 *              -precio
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Actualice el nombre del producto
 *              precio:              
 *                  type: integer
 *                  description: Actualice el precio del producto
 *              
 *          example:
 *              nombre: jabon azul
 *              precio: 3000
 *              
 *              
 *           
 *             
 */




module.exports = router;

