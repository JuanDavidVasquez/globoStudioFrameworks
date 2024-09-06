import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Usuario'
    },
    points:{
        type: Number,
        default: 0
    },
    discount:{
        type: Number,
        default: 0
    },
    subtotal:{
        type: Number,
        require: true,
    },
    total:{
        type: Number,
        require: true,
    },
    status:{
        type: String,
        trim: true
    }
},{
    timestamps:true
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

/* 
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    points INT DEFAULT 0,
    subtotal DECIMAL(15, 2) NOT NULL,  
    total DECIMAL(15, 2) NOT NULL,    
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/