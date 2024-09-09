import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});

    const crearOrder = async (order) => {
        console.log(order);
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.post("/order-items/order-create", order, config);

            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };

    const getOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.get("/order-items/orders", config);

            toast.success("Orders cargadas correctamente");

            setOrders(data);

            console.log(data);

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Error al cargar orders");
        }
    };

    const updateOrderStatus = async (order) => {
      console.log(order);
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.put(`/orders/update-status/${order.id}`, order, config);

            toast.success("Order actualizada correctamente");

            console.log(data);

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Error al actualizar order");
    };
  };

  return (
    <OrderContext.Provider
      value={{
        crearOrder,
        getOrders,
        orders,
        order,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export { OrderProvider };
export default OrderContext;