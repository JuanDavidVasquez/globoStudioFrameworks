import OrderItem from "../models/OrderItem.js";
import Order from "../models/Order.js";
import Producto from "../models/Producto.js";

const createOrderItem = async (req, res) => {
    const { order_id, product_id, quantity } = req.body;
    try {
        const order = await Order.findById(order_id);
    
        if (!order) {
        return res.status(400).json({ msg: "Orden no encontrada" });
        }
    
        const orderItem = new OrderItem({
        order_id,
        product_id,
        quantity
        });
    
        await orderItem.save();
    
        res.json(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const updateOrderItem = async (req, res) => {
    const { order_id, product_id, quantity } = req.body;
    try {
        const order = await Order.findById(order_id);
    
        if (!order) {
        return res.status(400).json({ msg: "Orden no encontrada" });
        }
    
        const orderItem = new OrderItem({
        order_id,
        product_id,
        quantity
        });
    
        await orderItem.save();
    
        res.json(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const createOrderItems = async (req, res) => {
    const { order_id, items } = req.body; // 'items' es un array de { product_id, quantity }

    try {
        const order = await Order.findById(order_id);
        
        if (!order) {
            return res.status(400).json({ msg: "Orden no encontrada" });
        }

        const orderItems = [];

        for (const item of items) {
            const { product_id, quantity } = item;

            // Validar si el producto existe
            const product = await Producto.findById(product_id);
            if (!product) {
                return res.status(400).json({ msg: `Producto con id ${product_id} no encontrado` });
            }

            // Crear y guardar el OrderItem
            const orderItem = new OrderItem({
                order_id,
                product_id,
                quantity
            });

            await orderItem.save(); // Guarda cada item
            orderItems.push(orderItem); // Almacena en el array
        }

        res.json(orderItems); // Retorna todos los items guardados
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const updateOrderwithTotal = async (req, res) => {
    const { id } = req.params;  // El id es el order_id
  
    try {
      // Buscamos todos los OrderItems que tengan el order_id igual al id recibido
      const orderItems = await OrderItem.find({ order_id: id })
        .select('-__v -createdAt -updatedAt') // Excluir __v y timestamps
        .populate({
          path: 'product_id', // Traemos la información de los productos asociados
          model: 'Producto'
         
        });
  
      if (!orderItems || orderItems.length === 0) {
        return res.status(404).json({ msg: "No se encontraron items para esta orden" });
      }
      

      // Calculamos el total sumando el precio multiplicado por la cantidad para cada item
      let total = 0;
      orderItems.forEach(item => {
        const price = item.product_id.price;  // Accedemos al precio del producto
        const quantity = item.quantity;       // Accedemos a la cantidad del item
        total += price * quantity;            // Multiplicamos y sumamos al total
      });
  
      

      // Buscamos la orden principal y actualizamos el total
      const orderMain = await Order.findByIdAndUpdate(
        id, 
        { total },  // Actualizamos el campo 'total' con el valor calculado
        { new: true, select: '-__v -createdAt -updatedAt' } // Excluir __v y timestamps y retornar la orden actualizada
      );
  
      // Respondemos con los OrderItems y la información de la orden
      res.json({ total, orderItems, orderMain });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };

 const getOrderWithItems = async (req, res) => {
    const { id } = req.params;
  
    try {
        const orderItems = await OrderItem.find({ order_id: id })
        .select('-__v -createdAt -updatedAt') // Excluir __v y timestamps
        .populate({
          path: 'product_id', 
          model: 'Producto'
        })
        .select('-__v -createdAt -updatedAt');

        const order = await Order.findById(id)
        .select('-__v -createdAt -updatedAt');

        res.json({ orderItems, order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

  
  
  

export{
    createOrderItem,
    updateOrderItem,
    createOrderItems,
    updateOrderwithTotal,
    getOrderWithItems,
};