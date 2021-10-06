const { obtenerUsuarios } = require('../models/usuario.model')


const autenticacion = (usuario, contrasena) => {
    const usuarioEncontrado = obtenerUsuarios().find(u => u.username === usuario && u.password === contrasena);
    if (usuarioEncontrado) return true;
    else return false;
}


/*const autenticacion = (usuario, contrasena) => {
    const usuarios = obtenerUsuarios().filter(u => u.username === usuario && u.password === contrasena)
    if (usuarios.length <= 0) {
        return false
    }
    const userMatches = basicAuth.safeCompare(usuario, usuarios[0].username);
    const passwordMatches = basicAuth.safeCompare(contrasena, usuarios[0].password)
    return userMatches && passwordMatches;
}*/

module.exports = autenticacion;
