import mongoose from "mongoose";

const productoShema = mongoose.Schema({
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Categoria'
    },
    name:{
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    price:{
        type: Number,
        require: true,
    }
 });

const Producto = mongoose.model("Producto", productoShema);
export default Producto;

/* 
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(15, 2) NOT NULL,  -- Modificado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
*/