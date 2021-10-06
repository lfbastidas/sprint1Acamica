const usuarios = [
    {
        username: "Mauricio",
        password: "12345",
        email: "pipe@gmail.com",
        isAdmin: true,
        idUser: 1
    },
    {
        username: "admin",
        password: "12345",
        email: "felipe@gmail.com",
        isAdmin: true,
        idUser: 2
    }
];

const usuariosLogueados = [];

const obtenerUsuarios = () => {
    return usuarios;
}

const agregarUsuario = (usuarioNuevo) => {
    usuarioNuevo.id = obtenerUsuarios().length + 1
    usuarioNuevo.isAdmin = false
    usuarios.push(usuarioNuevo);
}







module.exports = { obtenerUsuarios, agregarUsuario }
