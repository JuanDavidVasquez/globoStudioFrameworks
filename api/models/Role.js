import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    }
},{
    timestamps:true
});

const Role = mongoose.model("Role", roleSchema);
export default Role;