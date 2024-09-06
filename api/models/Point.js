import mongoose from "mongoose";

const pointShema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Usuario'
    },
    accumulated:{
        type: Number,
        default: 0
    },
    expires:{
        type: Date,
    }
},{
    timestamps:true
});

const Point = mongoose.model("Point", pointShema);
export default Point;

/* 
CREATE TABLE points (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    accumulated INT DEFAULT 0,
    expires DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 */