import Role from '../models/Role.js';

const createRole = async (req, res) => {
    const { name } = req.body;

    try {
        const role = new Role({ name });
        await role.save();

        res.json(role);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const updateRole = async (req, res) => {

    const { id } = req.params;
    try{
        const role = await Role.findById(id);
        if(!role){
            return res.status(404).json({ msg: 'Role no encontrado' });
        }
        const { name } = req.body;
        role.name = name;
        await role.save();
        res.json(role);
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }

};

const deleteRole = async (req, res) => {
    const { id } = req.params;
    try{
        const role = await Role.findById(id);
        if(!role){
            return res.status(404).json({ msg: 'Role no encontrado' });
        }
        await role.deleteOne();
        res.json({msg: 'Role eliminado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }   
};

export { 
    createRole,
    getRoles,
    updateRole,
    deleteRole,
 };