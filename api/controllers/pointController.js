import Points from '../models/Point.js';
import Usuario from '../models/Usuario.js';

const createPoint = async (req, res) => {
    const { user_id, accumulated, expires } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findById(user_id);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Crear el punto si el usuario existe
        const point = new Point({ user_id, accumulated, expires });
        await point.save();

        res.json(point);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getPoint = async (req, res) => {
    const { user_id } = req.params; // Cambiamos id a user_id en los parámetros

    try {
        const point = await Points.findOne({ user_id }) // Busca por el campo user_id
            .populate('user_id', 'name'); // Se sigue populando el campo user_id con el nombre del usuario

        if (!point) {
            return res.status(404).json({ msg: "Punto no encontrado" });
        }

        res.json(point);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


const getPoints = async (req, res) => {
    try {
        const points = await Points.find()
            .populate('user_id', 'name email');
        res.json(points);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const updatePoint = async (req, res) => {
    const { user_id, accumulated, expires } = req.body;
    const { id } = req.params;

    try {
        const point = await Points.findById(id);
        if (!point) {
            return res.status(404).json({ msg: "Punto no encontrado" });
        }

        point.user_id = user_id;
        point.accumulated = accumulated;
        point.expires = expires;

        await point.save();
        res.json(point);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const deletePoint = async (req, res) => {
    const { id } = req.params;

    try {
        await Points.findByIdAndDelete(id);
        res.json({ msg: "Punto eliminado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

export { 
    createPoint, 
    getPoint, 
    getPoints, 
    updatePoint, 
    deletePoint
 };



/* 
user_id
accumulated
expires
*/