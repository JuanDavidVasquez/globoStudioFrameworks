import OrderItem from "../models/OrderItem.js";
import Order from "../models/Order.js";
import Producto from "../models/Producto.js";
import Point from "../models/Point.js";

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

const getOrdersByUser = async (req, res) => {
  const { id } = req.params;

  try {
      // Buscar todas las órdenes del usuario
      const orders = await Order.find({ user_id: id })
          .select('-__v -createdAt -updatedAt'); // Excluir campos innecesarios

      // Si no se encuentran órdenes
      if (!orders || orders.length === 0) {
          return res.status(404).json({ msg: "No se encontraron órdenes para este usuario" });
      }

      // Iterar sobre cada orden y traer sus items
      const ordersWithItems = await Promise.all(orders.map(async (order) => {
          const orderItems = await OrderItem.find({ order_id: order._id })
              .select('-__v -createdAt -updatedAt')
              .populate({
                  path: 'product_id',
                  model: 'Producto'
              });

          return {
              order,
              orderItems
          };
      }));

      res.json(ordersWithItems);

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
  }
};

const createOrderWithItems = async (req, res) => {
    const { user_id, items, discount = 0,pointsUsed, status = "pendiente" } = req.body;
    console.log('Request Body:', req.body);
    
    // Convierte pointsUsed a número
    const pointsUsedNumber = Number(pointsUsed);
    console.log('Points Used (Number):', pointsUsedNumber);
    
    try {
        // Paso 1: Crear la orden vacía
        const initialOrder = new Order({
            user_id,
            points: 0, // Puntos inicialmente a 0
            subtotal: 0, // Se calculará después
            total: 0, // Se calculará después
            discount,
            status,
        });
        const savedOrder = await initialOrder.save();
    
        // Paso 2: Crear los OrderItems asociados
        let subtotal = 0;
        const orderItems = [];
    
        for (const item of items) {
            const { product_id, quantity, price } = item;
    
            // Validar si el producto existe
            const product = await Producto.findById(product_id);
            if (!product) {
                return res.status(400).json({ msg: `Producto con id ${product_id} no encontrado` });
            }
    
            // Calcular el subtotal del item
            const itemSubtotal = price * quantity; // Usa el precio enviado
            subtotal += itemSubtotal;
    
            // Crear y guardar el OrderItem
            const orderItem = new OrderItem({
                order_id: savedOrder._id,
                product_id,
                quantity,
                price,
            });
    
            await orderItem.save();
            orderItems.push(orderItem);
        }
    
        // Paso 3: Calcular el total después del descuento
        const totalAfterDiscount = subtotal - discount;
    
        // Paso 4: Calcular los puntos ganados por la orden
        const pointsEarned = Math.floor(Math.max(totalAfterDiscount, 0) / 200000) * 10;
    
        // Paso 5: Manejar los puntos del usuario
        let pointRecord = await Point.findOne({ user_id });
        if (!pointRecord) {
            pointRecord = new Point({
                user_id,
                accumulated: 0,
            });
        }
    
        // Verificar si el usuario tiene suficientes puntos para usar
        console.log(`Puntos disponibles: ${pointRecord.accumulated}`);
        console.log(`Puntos a usar: ${pointsUsedNumber}`);
        
        if (pointsUsedNumber > pointRecord.accumulated) {
            return res.status(400).json({ msg: "No hay suficientes puntos disponibles para usar" });
        }
    
        // Actualizar puntos acumulados
        pointRecord.accumulated -= pointsUsedNumber;
        pointRecord.accumulated += pointsEarned;
        await pointRecord.save();
        
        console.log(`Puntos actualizados: ${pointRecord.accumulated}`);
    
        // Paso 6: Actualizar la orden con los datos calculados
        savedOrder.subtotal = subtotal;
        savedOrder.total = totalAfterDiscount;
        savedOrder.points = pointsEarned;
        savedOrder.discount = discount;
        await savedOrder.save();
    
        // Paso 7: Enviar la respuesta final
        res.json({
            order: savedOrder,
            orderItems,
            updatedPoints: pointRecord.accumulated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


  
  

export{
    createOrderWithItems,
    createOrderItem,
    updateOrderItem,
    createOrderItems,
    updateOrderwithTotal,
    getOrderWithItems,
    getOrdersByUser
};