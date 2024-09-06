import mongoose from "mongoose";

const categoriaShema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    }
},{
    timestamps:true
});

const Categoria = mongoose.model("Categoria", categoriaShema);
export default Categoria;


/* 
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/