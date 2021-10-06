const express = require('express');
const { obtenerPedidos } = require('../models/pedido.model');
const router = express.Router();


const { agregarUsuario, obtenerUsuarios } = require('../models/usuario.model');

/**
 * @swagger
 * /registro:
 *  post:
 *      summary: Crea un usuario en el sistema
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuario' 
 *      responses:
 *          201:
 *              description: Usuario creado
 *          400:
 *              description: El usuario ya ha sido creado
 *
 */


router.post('/', (req, res) => {
    // console.log(req.auth.user);
    let { email } = req.body
    console.log(email)
    let emailDuplicados = obtenerUsuarios().find((dato) => dato.email == email)
    console.log(emailDuplicados)
    if (!emailDuplicados) {
        agregarUsuario(req.body);
        // res.send("El usuario se ha registado exitosamente")
        res.status(201).send()
    } else {
        res.status(400).send("El email ingresado ya esta en uso, escoja otro email")
    }
    console.log(req.body)

})

module.exports = router;