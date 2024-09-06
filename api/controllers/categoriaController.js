import Categoria from "../models/Categoria.js";

const crearCategoria = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Verificar si ya existe una categoría con el mismo nombre
    const categoriaExistente = await Categoria.findOne({ name });
    if (categoriaExistente) {
      return res.status(400).json({ msg: "La categoría ya existe" });
    }

    // Si no existe, crea la nueva categoría
    const categoria = new Categoria({ name, description });
    await categoria.save();

    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const editarCategoria = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    categoria.name = name;
    categoria.description = description;

    await categoria.save();
    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    await categoria.deleteOne();

    res.json({ msg: "Categoría eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


export {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    editarCategoria,
    eliminarCategoria
};