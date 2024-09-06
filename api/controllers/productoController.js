import Producto from '../models/Producto.js';

const crearProducto = async (req, res) => {
    const { category_id, name, description, price } = req.body;
    
    try {
        // Verificar si ya existe un producto con el mismo nombre
        const productoExistente = await Producto.findOne({
            name
        });
        if (productoExistente) {
            return res.status(400).json({
                msg: "El producto ya existe"
            });
        }

        // Si no existe, crea el nuevo producto
        const producto = new Producto({
            category_id,
            name,
            description,
            price
        });
        await producto.save();

        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
};

const obtenerProducto = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el producto por su ID y solo enviar los datos de la categoría necesarios
        const producto = await Producto.findById(id)
        .populate('category_id', 'name description');
            
        
        if (!producto) {
            return res.status(404).json({
                msg: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
};


const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find()
        .populate('category_id', 'name description');
        res.json(productos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
};

const editarProducto = async (req, res) => {
    const {
        category_id,
        name,
        description,
        price
    } = req.body;
    const {
        id
    } = req.params;

    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({
                msg: "Producto no encontrado"
            });
        }

        producto.category_id = category_id;
        producto.name = name;
        producto.description = description;
        producto.price = price;

        await producto.save();
        res.json(producto);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

const eliminarProducto = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({
                msg: "Producto no encontrado"
            });
        }
        
// Eliminar el producto directamente por su ID
// const producto = await Producto.findByIdAndDelete(id);

        await producto.deleteOne();
        res.json({
            msg: "Producto eliminado"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

export {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    editarProducto,
    eliminarProducto
};
