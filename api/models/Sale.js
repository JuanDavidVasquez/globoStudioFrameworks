import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Usuario'
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Order'
    },
    status:{
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

const Order = mongoose.model("Order", orderSchema);
export default Order;

/* 
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    status VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
*/