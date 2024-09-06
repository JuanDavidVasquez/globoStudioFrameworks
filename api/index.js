import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectarDB from "./config/db.js";
import usuarioRoute from './routes/usuarioRoutes.js';
import categoriaRoute from './routes/categoriaRoutes.js';
import productoRoute from './routes/productoRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import orderItemRoute from './routes/orderItemRoutes.js';
import roleRoute from './routes/roleRoutes.js';
import pointRoute from './routes/pointRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

connectarDB();

const whitelist = [process.env.FRONTEND_URL];

const blacklist = [];

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Error de cors"));
        }
    }
}

app.use(cors(corsOptions));

//Routing

app.use('/api/usuarios', usuarioRoute);
app.use('/api/categorias', categoriaRoute);
app.use('/api/productos', productoRoute);
app.use('/api/orders', orderRoute);
app.use('/api/order-items', orderItemRoute);
app.use('/api/role', roleRoute);
app.use('/api/points', pointRoute);


const PORT = process.env.PORT || 4000;

const servidor = app.listen(4000, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
});
