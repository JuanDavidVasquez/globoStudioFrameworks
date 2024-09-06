import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Order'
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Producto'
    },
    quantity:{
        type: Number,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    }
},{
    timestamps:true
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;

/* 
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
*/