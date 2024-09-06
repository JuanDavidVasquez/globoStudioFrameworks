import mongoose from "mongoose";

const userRoleRoutesSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Usuario'
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Role'
    }
},{
    timestamps:true
});

const UserRoleRoutes = mongoose.model("UserRoleRoutes", userRoleRoutesSchema);  
export default UserRoleRoutes;