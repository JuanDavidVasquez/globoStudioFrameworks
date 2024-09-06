import Order from "../models/Order.js";
import User from "../models/Usuario.js";
import Point from "../models/Point.js";

const createOrder = async (req, res) => {
  const { user_id, subtotal, total = 0, status, points: pointsUsed = 0, discount = 0 } = req.body;

  try {
      // Calcular el total con el descuento aplicado
      const totalAfterDiscount = total - discount;

      // Calcular los puntos en base al total después del descuento
      const pointsEarned = Math.floor(Math.max(totalAfterDiscount, 0) / 200000) * 10;

      // Verificar si el usuario tiene puntos acumulados
      let pointRecord = await Point.findOne({ user_id });

      if (!pointRecord) {
          // Si no existe un registro de puntos, crearlo con 0 puntos acumulados
          pointRecord = new Point({
              user_id,
              accumulated: 0
          });
      }

      // Verificar si el usuario tiene suficientes puntos para usar
      if (pointsUsed > pointRecord.accumulated) {
          return res.status(400).json({ msg: "No hay suficientes puntos disponibles para usar" });
      }

      // Restar los puntos utilizados del registro del usuario
      pointRecord.accumulated -= pointsUsed;

      // Agregar los puntos ganados a los puntos acumulados del usuario
      pointRecord.accumulated += pointsEarned;

      // Guardar los puntos actualizados
      await pointRecord.save();

      // Crear la orden después de actualizar los puntos
      const order = new Order({
          user_id,
          points: pointsEarned, // Los puntos ganados por la orden
          subtotal,
          total: totalAfterDiscount, // Guardar el total después de aplicar el descuento
          discount,
          status: "pendiente"
      });
      await order.save();

      res.json({ order, updatedPoints: pointRecord.accumulated });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
  }
};



const obtenerOrderUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const orders = await Order.find({ user_id });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const obtenerOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ msg: "Orden no encontrada" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { createOrder, obtenerOrderUser, obtenerOrder };