const { obtenerUsuarios } = require('../models/usuario.model')

function adminpermisos(req, res, next) {
    const { user, password } = req.auth
    const userAdmin = obtenerUsuarios().find(u => u.username == user && u.password == password && u.isAdmin === true)
    console.log(userAdmin)
    if (!userAdmin) {
        res.json("Usuario no autorizado");
    }
    else {
        next();
    }
}

module.exports = { adminpermisos };

