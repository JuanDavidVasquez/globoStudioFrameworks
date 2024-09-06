import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import {emailRegistro, emailOlvidePassword} from '../helpers/email.js';


const registrar = async (req, res) => {
    //Evitar registros duplicados
  
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });
  
    if (existeUsuario) {
      const error = new Error("Usuario ya registrado");
      return res.status(400).json({ msg: error.message });
    }
  
    try {
      const usuario = new Usuario(req.body);
      usuario.token = generarId();
      await usuario.save();
  
      // Enviar el email de confirmación
  
      emailRegistro({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
      });
  
      res.status(200).json({msg: 'Usuario creado correctamente. Revisa tu Email para confirmar tu cuenta'});
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Hubo un error", status: 400 });
    }
  };

  
const autenticar = async (req, res) => {
    const { email, password } = req.body;
  
    //Comprobar si usuario existe
  
    const usuario = await Usuario.findOne({ email });
  
    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }
  
    //Comprobar si el usuario esta confirmado
  
    if (!usuario.confirmado) {
      const error = new Error("Cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    }
  
    //comprobar password
  
    if (await usuario.comprobarPassword(password)) {
      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: generarJWT(usuario._id),
      });
    } else {
      const error = new Error("El Passqord es Incorrecto");
      return res.status(403).json({ msg: error.message });
    }
  };
  
  const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token });
  
    if (!usuarioConfirmar) {
      const error = new Error("Token no valido");
      return res.status(403).json({ msg: error.message });
    }
    try {
      usuarioConfirmar.confirmado = true;
      usuarioConfirmar.token = "";
      await usuarioConfirmar.save();
      res.status(200).json({ msg: "Usuario Confirmado Correctamente" });
    } catch (error) {
      console.log(error);
    }
    console.log(usuarioConfirmar);
  };
  
  const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }
    try {
      usuario.token = generarId();
      await usuario.save();
  
      //Enviar Email
  
      emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
      });
  
      res.status(200).json({ msg: "Hemos enviado un email con las instrucciones" });
    } catch (error) {
      console.log(error);
    }
  };
  
  const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
  
    if (tokenValido) {
      res.json({ msg: "token valido" });
      console.log("token valido");
    } else {
      const error = new Error("token no valido");
      return res.status(404).json({ msg: error.message });
    }
  };
  
  const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const usuario = await Usuario.findOne({ token });
  
    if (usuario) {
      usuario.password = password;
      usuario.token = "";
  
      try {
        await usuario.save();
        res.json({ msg: "Password actualizado correctamente" });
      } catch (error) {
        console.log(error);
      }
    } else {
      const error = new Error("token no valido");
      return res.status(404).json({ msg: error.message });
    }
  };
  
  const perfil = async (req,res) => {
    const { usuario } = req;
    res.json(usuario);
  }

  const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  };

  const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
  
    const { nombre, email, password } = req.body;
    
    // Actualiza los campos que llegan en el body de la solicitud
    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    
    // Solo actualiza el password si se proporciona
    if (password) {
      // En caso de que necesites hashear la nueva contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10); // Asegúrate de importar bcrypt
      usuario.password = hashedPassword;
    }
    
    await usuario.save();
    
    res.json({ msg: 'Usuario actualizado correctamente', usuario });
  };
  
  
  export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil,
    getUsuarios,
    updateUsuario,
  };
  