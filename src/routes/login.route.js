const basicAuth = require('express-basic-auth');
const express = require('express');
const router = express.Router();

const { obtenerUsuarios } = require('../models/usuario.model');


/**
 * @swagger
 * /login:
 *  post:
 *      summary: Loguear usuario
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuario' 
 *      responses:
 *          200:
 *              description: Usuario logueado correctamente
 *          400:
 *              description: La contraseña no es correcta
 *
 */



router.post('/', (req, res) => {

    const { email, contrasena } = req.body;
    const obtenerUser = obtenerUsuarios().find(u => u.email == email)
    const obtenerContrasena = obtenerUsuarios().find(u => u.contrasena == contrasena)
    if (obtenerUser) {
        if (obtenerContrasena) {
            res.status(200).send("user logued success")
        } else res.status(400).send("contraseña incorrecta")
    } else res.status(400).send("usuario incorrecto")

});
module.exports = router;