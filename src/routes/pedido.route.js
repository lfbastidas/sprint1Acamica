const express = require('express');
const router = express.Router();
const { obtenerPedidos } = require('../models/pedido.model');
const { adminpermisos } = require('../middlewares/Administrador.middleware')
const { obtenerProductos } = require('../models/producto.model')
const { obtenerUsuarios } = require('../models/usuario.model')





/**
 * @swagger
 * /pedidos/crearpedido/{idUser}:
 *  post:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 *      
 *      summary: Crear un pedido por parte de un usuario registrado
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/pedido' 
 *      responses:
 *          200:
 *              description: Producto agregado
 *          500:
 *              description: No se ha encontrado el producto
 *                  
 *             
 */

var arr = []
// realizar pedidos estado pendiente, crear pedido
router.post('/crearpedido/:idUser', (req, res) => {
    const userId = req.params.idUser;
    //let [{ idProducto }] = req.body
    let idenficadorUsuario = obtenerUsuarios().find(u => u.id == userId)
    if (idenficadorUsuario) {
        for (let pr of req.body) {
            let cantidad = pr.cantidad
            let pro = pr.idProducto
            let productoPedido = obtenerProductos().find(p => p.id == pro)
            if (productoPedido) {
                productoPedido.cantidad = cantidad
                arr.push(productoPedido)
            }

            else res.status(500).send("El producto no se encuentra")
            console.log("el producto no se encuentra")

        }
        let idPedido = obtenerPedidos().length + 1
        const pedido = {
            idPedido: idPedido,
            estado: "pendiente",
            idUser: userId,
            productoP: arr
        }
        obtenerPedidos().push(pedido)
        res.status(200).send("Se ha añadido el producto al carrito")
        // res.send("Se ha añadido  su producto al carrito de compras")
    }
    else res.status(400).send("Usuario no registrado")
})

/**
 * @swagger
 * /pedidos/confirmarpedido/{idUser}:
 *  post:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Confirmar el pedido por parte de usuario
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/confirmarpedido' 
 *      responses:
 *          200:
 *              description: Se ha confirmado el pedido
 *          401:
 *              descripcion: Usuario no autorizado
 *      
 *
 */


// realizar pedidos estado Confirmado

router.post('/confirmarpedido/:idUser', (req, res) => {
    let { idPedido } = req.body
    const userId = req.params.idUser;
    let idenficadorUsuario = obtenerUsuarios().find(u => u.id == userId)
    if (idenficadorUsuario) {
        let pedidoConfirmado = obtenerPedidos().find(p => p.idPedido == idPedido)

        console.log(pedidoConfirmado)
        pedidoConfirmado.estado = "Confirmado"
        res.status(200).send()
    }
    else res.status(401).send("Usuario no autorizado")
    // console.log(pedidoConfirmado)
    //res.send("Se ha confirmado su pedido")

})


/**
 * @swagger
 * /pedidos/editarpedidocantidad/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Editar cantidad del pedido de un producto
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/cantidadpedido' 
 *      responses:
 *          200:
 *              description: Cantidad del producto cambiada
 *      
 *
 */

// Cuando un usuario edita un pedido debe validar:
router.put('/editarpedidocantidad/:idUser', (req, res) => {
    let { idPedido, idProducto, nuevaCantidad } = req.body
    const userId = req.params.idUser;
    let idenficadorUsuario = obtenerUsuarios().find(u => u.id == userId)


    if (idenficadorUsuario) {
        let buscarPedido = obtenerPedidos().find(p => p.idPedido == idPedido)
        console.log(buscarPedido.estado)
        if (buscarPedido.estado == "pendiente") {
            for (let b of buscarPedido.productoP) {
                if (b.id == idProducto) {
                    b.cantidad = nuevaCantidad
                }
            }
            res.status(200).send()
        }
        else res.send("El estado ya esta confirmado y no puede hacer cambios")
    }
    else
        res.status(401).send("Usuario no autorizado")
    // res.send("Pedido cambiado")
})




/**
 * @swagger
 * /pedidos/editareliminarproducto/{idUser}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Eliminar un producto del pedido por parte del usuario
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/eliminarproducto' 
 *      responses:
 *          200:
 *              description: Producto eliminado
 *      
 *
 */


router.delete('/editareliminarproducto/:idUser', (req, res) => {
    let { idPedido, idProducto } = req.body
    const userId = req.params.idUser;
    let idenficadorUsuario = obtenerUsuarios().find(u => u.id == userId)
    if (idenficadorUsuario) {
        let buscarPedido = obtenerPedidos().find(p => p.idPedido == idPedido)

        if (buscarPedido.estado == "pendiente") {
            let posicionObjeto = buscarPedido.productoP.findIndex(p => p.id == idProducto)
            buscarPedido.productoP.splice(posicionObjeto, 1)
            res.status(200).send("Producto Eliminado")

        }
        else
            res.status(401).send("Usuario no autorizado")
    }
})


/**
 * @swagger
 * /pedidos/editaragregarpedido/{idUser}:
 *  post:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Se edita el pedido agregando un nuevo producto por parte del usuario
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/agregarproducto' 
 *      responses:
 *          200:
 *              description: El producto se ha agregado al pedido
 *      
 *
 */

router.post('/editaragregarpedido/:idUser', (req, res) => {
    let { idPedido, idProducto } = req.body
    const userId = req.params.idUser;
    let idenficadorUsuario = obtenerUsuarios().find(u => u.id == userId)
    if (idenficadorUsuario) {
        let buscarPedido = obtenerPedidos().find(p => p.idPedido == idPedido)

        if (buscarPedido.estado == "pendiente") {
            let productoPedido = obtenerProductos().find(p => p.id == idProducto)
            buscarPedido.productoP.push(productoPedido)
            console.log(productoPedido)
            res.status(200).send()
        }
        else
            res.status(401).send("Usuario no autorizado")
        // res.send("Producto agregado al pedido")
    }
})

/**
 * @swagger
 * /pedidos/{idUser}:
 *  get:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Historial 
 *      tags: [Pedidos]
 *      responses:
 *          200:
 *              description: Historial de sus pedidos por parte del usuario
 *          404:
 *              description: El usuario no ha realizado pedidos
 *      
 *
 */


// Hitorial de pedidos por usuario
router.get('/:idUser', (req, res) => {
    const idHistorialUser = req.params.idUser;
    let historialPedidos = obtenerPedidos()

    //let idenficadorUsuario = obtenerUsuarios().find(u => u.id == idHistorialUser)
    let consultaPedidos = historialPedidos.filter(p => p.idUser == idHistorialUser)
    console.log(historialPedidos)
    if (consultaPedidos.length) {
        res.send(consultaPedidos)
        // res.status(200).send()
    } else {
        res.send("El usuario no esta autoriado")
        res.status(401).send()
    }


})

/**
 * @swagger
 * /pedidos/preparacion/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Pasar a estado en prerparacion del pedido por parte del administrador
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/estadopedido' 
 *      responses:
 *          200:
 *              description: Pedido ha pasado en estado preparacion
 *          401:
 *              description: Usuario no autorizado
 *
 */

//Pedido en preparacion
router.put('/preparacion/:idUser', adminpermisos, (req, res) => {
    let idUser = req.params.idUser
    let { idPedido } = req.body
    let idenficadorUsuario = obtenerUsuarios().find(u => u.id == idUser)
    if (idenficadorUsuario) {
        let pedidoEnPreparacion = obtenerPedidos().find(p => p.idPedido == idPedido)
        console.log(pedidoEnPreparacion)
        pedidoEnPreparacion.estado = "Preparacion"

        res.status(200).send("Se ha preparado su pedido")

    }
    else res.status(401).send("Usuario no autorizado")
})

/**
 * @swagger
 * /pedidos/enviado/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idUser
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Pasar a estado enviado del pedido por parte del administrador
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/estadopedido' 
 *      responses:
 *          200:
 *              description: El pedido se ha enviado
 *          401:
 *              description: Usuario no autorizado
 *
 */


router.put('/enviado/:idUser', adminpermisos, (req, res) => {
    let idUser = req.params.idUser
    let { idPedido } = req.body
    let idenficadorUsuario = obtenerUsuarios().find(u => u.id == idUser)
    if (idenficadorUsuario) {
        let pedidoEnviado = obtenerPedidos().find(p => p.idPedido == idPedido)
        console.log(pedidoEnviado)
        pedidoEnviado.estado = "Enviado"
        //console.log(pedidoEnviado)
        res.status(200).send("Se ha enviado su pedido")

    }
    else res.status(401).send("Usuario no autorizado")
})
// res.send("Se ha enviado su pedido")



/**
 * @swagger
 * /pedidos/entregado/{idUser}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: idPedido
 *        description: Identificador del usuario
 *        required: true
 *        type: integer
 * 
 *      summary: Pasar a estado en entregado del pedido por parte del administrador
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/estadopedido' 
 *      responses:
 *          200:
 *              description: El pedido se ha entregado
 *          401:
 *              description: Usuario no autorizado
 *
 */

router.put('/entregado/:idUser', adminpermisos, (req, res) => {
    let idUser = req.params.idUser
    let { idPedido } = req.body
    let idenficadorUsuario = obtenerUsuarios().find(u => u.id == idUser)
    if (idenficadorUsuario) {
        let pedidoEntregado = obtenerPedidos().find(p => p.idPedido == idPedido)
        //  console.log(pedidoEntregado)
        pedidoEntregado.estado = "Entregado"
        //console.log(pedidoEntregado)
        res.status(200).send("Se ha entregado su pedido")

    }
    else res.status(401).send("El usuario no esta autorizado")
})

/**
 * @swagger
 * /pedidos:
 *  get:
 *      summary: Obtener todos los Pedidos del sistema por parte del administrador
 *      tags: [Pedidos]
 *      responses:
 *          200:
 *              description: Historial de todos los pedidos del sistema
 *              
 */

router.get('/', adminpermisos, (req, res) => {
    console.log(obtenerPedidos())
    res.send(obtenerPedidos())
})



//Historial de los productos por parte del administrador
/*router.get('/:id', adminpermisos, (req, res) => {
    const idHistorialUser = req.params.id;
    let historialPedidos = obtenerPedidos()
    let consultaPedidos = historialPedidos.filter(p => p.userId == idHistorialUser)
    if (consultaPedidos) {
        res.send(consultaPedidos)
    } else {
        res.send("El usuario aun no ha realizado pedidos")
    }
})*/



/**
 * @swagger
 * tags:
 *  name: Pedidos
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      pedido:
 *          type: array
 *          items:
 *              type: object
 *          required:
 *              -cantidad
 *              -idProducto
 *          properties:
 *              cantidad:
 *                  type: integer
 *                  description: Numero de productos que desea llevar
 *              idProducto:
 *                  type: integer
 *                  description: Identificador del producto
 *          example:
 *              cantidad: 5
 *              idProducto: 1
 */


/**
 * @swagger
 * tags:
 *  name: ConfirmarPedidos
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      confirmarpedido:
 *          type: object
 *          required:          
 *              -idPedido
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Identificador del pedido
 *          example:
 *              idPedido: 1
 */




/**
 * @swagger
 * tags:
 *  name: EditarCantidadPedidos
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      cantidadpedido:
 *          type: object
 *          required:          
 *              -idPedido
 *              -idProducto
 *              -nuevaCantidad
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Numero del pedido
 *              cantidad:
 *                  type: integer
 *                  description: Numero de productos que desea llevar
 *              nuevaCantidad:
 *                  type: integer
 *                  description: Modificar la cantidad el producto
 *          example:
 *              idPedido: 1
 *              idProducto: 1
 *              nuevaCantidad: 3621
 */



/**
 * @swagger
 * tags:
 *  name: EliminarProducto
 *  description: Seccion de usuarios
 * 
 * components: 
 *  schemas:
 *      eliminarproducto:
 *          type: object
 *          required:          
 *              -idPedido
 *              -idProducto
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Numero del pedido
 *              idProducto:
 *                  type: integer
 *                  description: Identificador del producto
 *          example:
 *              idPedido: 1
 *              idProducto: 2
 *             
 */



/**
 * @swagger
 * tags:
 *  name: AgregarProducto
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      agregarproducto:
 *          type: object
 *          required:          
 *              -idPedido
 *              -idProducto
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Numero del pedido
 *              idProducto:
 *                  type: integer
 *                  description: Identificador del producto
 *          example:
 *              idPedido: 1
 *              idProducto: 2
 *             
 */


/**
 * @swagger
 * tags:
 *  name: estadopedido
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      estadopedido:
 *          type: object
 *          required:          
 *              -idUser
 *          properties:
 *              idPedido:
 *                  type: integer
 *                  description: Identificador del usuario
 *          example:
 *              idPedido: 1
 *           
 *             
 */
module.exports = router;