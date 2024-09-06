import UserRoleRoutes from "../models/UserRoleRoutes.js";

const createUserRole = async (req, res) => {
    const { user_id, role_id } = req.body;

    try {
        const userRole = new UserRoleRoutes({ user_id, role_id });
        await userRole.save();

        res.json(userRole);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


export { createUserRole };