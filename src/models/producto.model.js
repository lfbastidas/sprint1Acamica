const productos = [
    {
        id: 1,
        nombre: "Cocacola",
        precio: 3000,
        descripcion: "bebiba gaseosa",

    },
    {
        id: 2,
        nombre: "Pony Malta",
        precio: 2500,
        descripcion: "bebiba gaseosa"
    },
    {
        id: 3,
        nombre: "Camisa",
        precio: 30000,
        descripcion: "Camisa manga larga negra"
    }
];

const obtenerProductos = () => {
    return productos
}

const agregarProducto = (nuevoProducto) => {
    nuevoProducto.id = obtenerProductos().length + 1
    productos.push(nuevoProducto)

}


module.exports = { obtenerProductos, agregarProducto }