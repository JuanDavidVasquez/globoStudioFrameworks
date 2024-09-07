import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {

 


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


  return (
    <OrderContext.Provider
      value={{
        crearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export { OrderProvider };
export default OrderContext;