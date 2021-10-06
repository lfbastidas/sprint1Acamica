const express = require('express');
const router = express.Router();

const { obtenerUsuarios } = require('../models/usuario.model');
const { adminpermisos } = require('../middlewares/Administrador.middleware')
/**
 * @swagger
 * /usuarios:
 *  get:
 *      summary: Obtener todos los usuarios del sistema por parte del administrador
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema
 *              
 */
router.get('/', adminpermisos, (req, res) => {
    // console.log(req.auth.user);
    res.json(obtenerUsuarios());
})



router.post('/', (req, res) => {
    res.sendStatus(201);
});

router.put('/:email', (req, res) => {
    console.log(req.body);
    res.json(usuario);
});

router.delete('/:email', (req, res) => {
    res.json('Usuario eliminado');
});

//Usuarios adminstradores





/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Seccion de usuarios
 * 
 * components: 
 *  schemas:
 *      usuario:
 *          type: object
 *          required:
 *              -email
 *              -contrasena
 *          properties:
 *              email:
 *                  type: string
 *                  description: Email del usuario
 *              contrasena:
 *                  type: string
 *                  description: Contrasena del usuario
 *          example:    
 *              email: usuario@gmail.com
 *              contrasena: 1234abc
 */















module.exports = router;
